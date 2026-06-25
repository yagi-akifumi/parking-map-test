import React from "react";
import Map from "./Map";
import ShopListItem from "./ShopListItem";
import "./Home.scss";

type Props = {
  data: Pwamap.ShopData[];
};

const Content = (props: Props) => {
  const [isListOpen, setIsListOpen] = React.useState(false);

  const popupHandler = () => {
    // まずは何もしない。後で「一覧クリックで地図を動かす」などを追加できます。
  };

  return (
    <div className="parking-dashboard">
      <aside className={`parking-sidebar ${isListOpen ? "is-open" : ""}`}>
        <button
          type="button"
          className="parking-sidebar-header"
          onClick={() => setIsListOpen(!isListOpen)}
        >
          <div>
            <h1>駐車場の利用状況</h1>
            <p>現地スタッフ更新による空き状況の目安です</p>
          </div>

          <span className="parking-toggle">
            {isListOpen ? "閉じる" : "一覧を開く"}
          </span>
        </button>

        <div className="parking-sidebar-list">
          {props.data.map((item, index) => (
            <ShopListItem
              key={`${item["スポット名"]}-${index}`}
              data={item}
              popupHandler={popupHandler}
              queryCategory={null}
            />
          ))}
        </div>
      </aside>

      <main className="parking-map-area">
        <Map data={props.data} />
      </main>
    </div>
  );
};

export default Content;