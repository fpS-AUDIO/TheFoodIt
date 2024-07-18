import styles from "./About.module.css";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Footer from "../../components/Footer/Footer";

function About() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.mainTitle}>About TheFoodIt</h2>

      <div className={`${styles.block} ${styles.blockUnderlined}`}>
        <h3 className={styles.secondaryTitle}>Introduction</h3>
        <p className={styles.content}>
          Welcome to TheFoodIt, where I simplify the science of cooking so you
          can focus on creating delicious meals. My mission is to empower cooks,
          chefs, and food enthusiasts by providing tools that enhance your
          culinary experience. With TheFoodIt, you create the meals, and I
          handle the math.
        </p>
      </div>

      <div className={`${styles.block} ${styles.blockUnderlined}`}>
        <h3 className={styles.secondaryTitle}>My Story</h3>
        <p className={styles.content}>
          Hi, I&apos;m Alexander Ivanov, a former chef turned web developer.
          TheFoodIt was born out of my passion for both culinary arts and
          technology. My journey began in the catering industry, where I honed
          essential skills like organization, autonomy, adaptability, and
          problem-solving. This unique blend of culinary expertise and technical
          knowledge inspired me to create TheFoodIt, an application designed to
          make life easier for those in the kitchen.
        </p>
      </div>

      <div className={`${styles.block} ${styles.blockUnderlined}`}>
        <h3 className={styles.secondaryTitle}>My Vision</h3>
        <p className={styles.content}>
          I am committed to continuous improvement and innovation. In the
          future, I plan to introduce more features that will further assist
          chefs and cooks in managing their kitchens efficiently. My goal is to
          create a comprehensive platform that not only simplifies cooking
          processes but also enhances culinary creativity and precision. I value
          user feedback immensely and aim to tailor TheFoodIt to meet your
          needs.
        </p>
      </div>

      <div className={`${styles.block} ${styles.blockUnderlined}`}>
        <h3 className={styles.secondaryTitle}>Thank You</h3>
        <p className={styles.content}>
          I would like to extend a heartfelt thank you to{" "}
          <a target="_blank" href="https://www.pexels.com">
            Pexels
          </a>{" "}
          for providing a vast library of free-to-use media. A special thank you
          to{" "}
          <a target="_blank" href="https://www.pexels.com/@cottonbro">
            cottonbro studio
          </a>{" "}
          for the video used on our landing page. You can view and download the
          video{" "}
          <a
            target="_blank"
            href="https://www.pexels.com/video/a-serving-of-cooked-soybean-pod-in-a-bowl-3298718/"
          >
            here
          </a>
          . Your contributions make our site more visually appealing and
          engaging.
        </p>
      </div>

      <div className={styles.block}>
        <h3 className={styles.secondaryTitle}>Get in Touch</h3>
        <p className={styles.content}>
          I&apos;d love to hear from you! Whether you have feedback, questions,
          or simply want to connect, don&apos;t hesitate to reach out. Follow me
          on{" "}
          <a target="_blank" href="https://www.instagram.com/mr.alex_i/">
            Instagram
          </a>{" "}
          or contact me on{" "}
          <a target="_blank" href="https://discordapp.com/users/SAUDIO#5715">
            Discord
          </a>
          . Your input is crucial in helping me improve TheFoodIt and make it
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
