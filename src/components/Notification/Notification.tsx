import React, { useState } from "react";
import styles from "./Notification.module.css";
import { Avatar, Button, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Link } from "react-router-dom";

function Notification() {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div onClick={handleExpandClick} className={styles.card}>
      <div className={styles.preview}>
        <div className={styles.avatar}>
          <Avatar sx={{ width: "3rem", height: "3rem" }} />
          <div className={styles.avatarInfo}>
            <h1 className={styles.avatarname}>فلانی</h1>
            {!expanded && <h2>فلانی یک دنگ...</h2>}
          </div>
        </div>
        <div className={styles.cardInfo}>
          <div>۱ فروردین</div>
          {!expanded && (
            <div
              className={styles.amount}
              style={{ color: "green" }}
            >{`+${100000}`}</div>
          )}
        </div>
      </div>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <div className={styles.expandedContent}>
          <p>
            "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
            کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی
            در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را
            می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی
            الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این
            صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و
            شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای
            اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد
            استفاده قرار گیرد."
          </p>
          <Link to="/app/search" className={styles.link}>
            جزئیات
          </Link>
        </div>
      </Collapse>
      <button onClick={handleExpandClick} className={styles.expandButton}>
        {expanded ? <ExpandLess /> : <ExpandMore />}
      </button>
    </div>
  );
}

export default Notification;
