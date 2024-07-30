import styles from "./About.module.css";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

function About() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.mainTitle}>About TheFoodIt</h2>

      <div className={`${styles.block} ${styles.blockUnderlined}`}>
        <h3 className={styles.secondaryTitle}>Introduction</h3>
        <p className={styles.content}>
          Welcome to TheFoodIt, where I simplify the science of cooking to help
          you create delicious meals with ease. My mission is to empower cooks,
          chefs, and food enthusiasts by providing practical tools that enhance
          your culinary experience. With TheFoodIt, you focus on the cooking,
          and I handle the technicalities.
        </p>
      </div>

      <div className={`${styles.block} ${styles.blockUnderlined}`}>
        <h3 className={styles.secondaryTitle}>My Story</h3>
        <p className={styles.content}>
          Hi, I'm Alexander Ivanov. I started my career as a chef and later
          transitioned into web development. My journey in the kitchen taught me
          invaluable lessons in organization, creativity, and problem-solving,
          which I now bring to the tech world. TheFoodIt is a product of my
          passion for both cooking and technology, designed to make life easier
          for those who share a love for culinary arts. I aim to blend my
          experiences in both fields to create a tool that simplifies kitchen
          tasks while encouraging creativity.
        </p>
      </div>

      <div className={`${styles.block} ${styles.blockUnderlined}`}>
        <h3 className={styles.secondaryTitle}>My Vision</h3>
        <p className={styles.content}>
          I'm dedicated to continuous learning and innovation. Looking ahead, I
          plan to introduce new features that will help chefs and cooks manage
          their kitchens more efficiently. My goal is to develop a comprehensive
          platform that not only simplifies cooking processes but also fosters
          creativity and precision. I highly value your feedback and strive to
          tailor TheFoodIt to better serve your needs.
        </p>
      </div>

      <div className={`${styles.block} ${styles.blockUnderlined}`}>
        <h3 className={styles.secondaryTitle}>Thank You</h3>
        <p className={styles.content}>
          I want to extend a sincere thank you to{" "}
          <a target="_blank" href="https://www.pexels.com">
            Pexels
          </a>{" "}
          for offering a wide array of free-to-use media. A special thanks to{" "}
          <a target="_blank" href="https://www.pexels.com/@cottonbro">
            cottonbro studio
          </a>{" "}
          for the video featured on our landing page. You can view and download
          the video{" "}
          <a
            target="_blank"
            href="https://www.pexels.com/video/a-serving-of-cooked-soybean-pod-in-a-bowl-3298718/"
          >
            here
          </a>
          . Your contributions help make the site more visually appealing and
          engaging.
        </p>
      </div>

      <div className={styles.block}>
        <h3 className={styles.secondaryTitle}>Get in Touch</h3>
        <p className={styles.content}>
          I'd love to hear from you! Whether you have feedback, questions, or
          simply want to connect, don't hesitate to reach out. Follow me on{" "}
          <a target="_blank" href="https://www.instagram.com/mr.alex_i/">
            Instagram
          </a>
          , join me on{" "}
          <a target="_blank" href="https://t.me/MrAlex_OFF">
            Telegram
          </a>
          , or contact me on{" "}
          <a target="_blank" href="https://discordapp.com/users/SAUDIO#5715">
            Discord
          </a>
          . Your input is invaluable in helping me improve TheFoodIt and make it
          the best it can be.
        </p>

        <br />
        <p className={styles.content}>
          For more details on how your data is handled, please review our{" "}
          <Link to="/PrivacyPolicy">Privacy Policy</Link>.
        </p>
      </div>

      <Footer />
    </div>
  );
}

export default About;
