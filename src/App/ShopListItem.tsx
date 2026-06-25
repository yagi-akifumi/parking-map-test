import './ShopListItem.scss'
import { Link } from "react-router-dom";
import { makeDistanceLabelText } from "./distance-label";

type Props = {
  data: Pwamap.ShopData;
  popupHandler: Function;
  queryCategory: string | null;
};

const Content = (props: Props) => {
  const clickHandler = () => {
    props.popupHandler(props.data)
  }

  const distanceTipText = makeDistanceLabelText(props.data.distance)
  const category = props.data['カテゴリ']
  const image = props.data['画像']
  const description = props.data['紹介文'] || ''
  const isCategoryPage = props.queryCategory ? true : false

  const getNumberFromDescription = (label: string) => {
    const match = description.match(new RegExp(`${label}：\\s*(\\d+)台`))
    return match ? Number(match[1]) : null
  }

  const getTextFromDescription = (label: string) => {
    const lines = description.split(/\r?\n/)
    const line = lines.find((text) => text.startsWith(`${label}：`))
    return line ? line.replace(`${label}：`, '').trim() : ''
  }

  const remaining = getNumberFromDescription('残り台数')
  const capacity = getNumberFromDescription('収容台数')
  const used = remaining !== null && capacity !== null ? Math.max(capacity - remaining, 0) : null
  const usageRate = used !== null && capacity ? Math.min(Math.round((used / capacity) * 100), 100) : 0

  const businessHours = getTextFromDescription('営業時間')
  const lastUpdated = getTextFromDescription('最終更新')
  const price = getTextFromDescription('料金')

  return (
    <>
      <div className="shop-link parking-card">
        {image && (
          <div className="parking-image-wrap" onClick={clickHandler}>
            <img src={image} alt={props.data['スポット名']} />
          </div>
        )}

        <div className="parking-card-body">
          <h2 className="shop-title" onClick={clickHandler}>
            {props.data['スポット名']}
          </h2>

          <div className="parking-status-row">
            {!isCategoryPage && (
              <Link to={`/list?category=${category}`}>
                <span className={`parking-status status-${category}`}>
                  {category}
                </span>
              </Link>
            )}

            {distanceTipText && (
              <span className="distance">現在位置から {distanceTipText}</span>
            )}
          </div>

          {used !== null && capacity !== null && (
            <div className="parking-usage">
              <div className="parking-usage-label">
                <span>利用状況</span>
                <strong>{used} / {capacity}台</strong>
              </div>
              <div className="parking-bar">
                <div
                  className="parking-bar-inner"
                  style={{ width: `${usageRate}%` }}
                />
              </div>
              {remaining !== null && (
                <div className="parking-remaining">
                  残り台数：{remaining}台
                </div>
              )}
            </div>
          )}

          <div className="parking-meta">
            {businessHours && <div>営業時間：{businessHours}</div>}
            {price && <div>料金：{price}</div>}
            {lastUpdated && <div>最終更新：{lastUpdated}</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;