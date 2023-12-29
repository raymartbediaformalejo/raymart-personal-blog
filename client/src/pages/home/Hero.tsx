import { Link } from "react-router-dom";
import classes from "../../styles/pages/home/Hero.module.css";

const Hero = () => {
  return (
    <section className={classes["hero"]}>
      <h1 className={classes["title"]}>G'day－how's it going? 🤙</h1>
      <h2 className={classes["sub-title"]}>
        I'm <Link to="/about">Raymart</Link>, a frontend developer. I thrive on
        learning about web.
      </h2>
      <h2 className={classes["sub-title"]}>
        Join me on this journey as I capture and share my adventures right here.
      </h2>
    </section>
  );
};

export default Hero;
