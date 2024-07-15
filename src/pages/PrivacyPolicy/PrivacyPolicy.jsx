import styles from "./PrivacyPolicy.module.css";
import Footer from "../../components/Footer/Footer";
import ButtonBack from "../../components/ButtonBack/ButtonBack";

function PrivacyPolicy() {
  return (
    <div className={styles.wrapper}>
      <ButtonBack />

      <h2 className={styles.mainTitle}>Privacy Policy</h2>

      <div className={`${styles.block} ${styles.blockUnderlined}`}>
        <h3 className={styles.secondaryTitle}>Introduction</h3>
        <p className={styles.content}>
          Welcome to TheFoodIt. Your privacy is important to us. This Privacy
          Policy explains how we collect, use, store, and protect your personal
          information when you use our web application.
        </p>
      </div>

      <div className={`${styles.block} ${styles.blockUnderlined}`}>
        <h3 className={styles.secondaryTitle}>Data Collection</h3>
        <p className={styles.content}>
          We collect the following personal information from users to provide
          our services:
        </p>
        <ul>
          <li>Gender</li>
          <li>Height</li>
          <li>Weight</li>
          <li>Age</li>
          <li>Physical Activity Level</li>
          <li>Health and Fitness Goal</li>
        </ul>
        <p className={styles.content}>
          This data is collected through a form that users fill out to receive
          personalized nutrition and fitness calculations, such as BMI, BMR,
          TDEE, TDEE with TEF, and macronutrient distribution.
        </p>
      </div>

      <div className={`${styles.block} ${styles.blockUnderlined}`}>
        <h3 className={styles.secondaryTitle}>Data Usage</h3>
        <p className={styles.content}>
          The collected data is used solely to provide the following features:
        </p>
        <ul>
          <li>
            KCALCULATOR: Analysis of body metrics and nutrition recommendations.
          </li>
        </ul>
      </div>

      <div className={`${styles.block} ${styles.blockUnderlined}`}>
        <h3 className={styles.secondaryTitle}>Data Storage and Security</h3>
        <ul>
          <li>
            The data you provide is stored locally in your browser&apos;s local
            storage. If local storage is not available, we use a JavaScript
            object to store the data within the web application session.
          </li>
          <li>We do not store your personal data on our servers.</li>
          <li>
            Your data is only accessible within your browser and is not shared
            with third parties.
          </li>
        </ul>
      </div>

      <div className={`${styles.block} ${styles.blockUnderlined}`}>
        <h3 className={styles.secondaryTitle}>User Rights</h3>
        <ul>
          <li>
            You can remove your data from local storage at any time through your
            browser settings.
          </li>
          <li>
            If you clear your browser&apos;s local storage, all data collected
            by our application will be deleted.
          </li>
        </ul>
      </div>

      <div className={`${styles.block} ${styles.blockUnderlined}`}>
        <h3 className={styles.secondaryTitle}>Cookies and Tracking</h3>
        <ul>
          <li>
            Currently, we do not use cookies or other tracking technologies to
            collect data about your browsing behavior.
          </li>
        </ul>
      </div>

      <div className={`${styles.block} ${styles.blockUnderlined}`}>
        <h3 className={styles.secondaryTitle}>Third-Party Services</h3>
        <ul>
          <li>
            Our application uses third-party libraries, such as{" "}
            <a
              target="_blank"
              href="https://www.npmjs.com/package/convert-units"
            >
              convert-units
            </a>
            , to provide specific functionalities. These libraries do not
            collect or store your personal data.
          </li>
          <li>
            Our website is hosted on Netlify, and we use a custom domain
            purchased from Namecheap. These services may collect non-personal
            data for their operational purposes. Please refer to their
            respective privacy policies for more information.
          </li>
        </ul>
      </div>

      <div className={`${styles.block} ${styles.blockUnderlined}`}>
        <h3 className={styles.secondaryTitle}>Generated Content</h3>
        <ul>
          <li>
            Some content on our site, such as feature descriptions, is generated
            using AI tools like ChatGPT. This content generation does not
            involve the collection or storage of personal data.
          </li>
        </ul>
      </div>

      <div className={`${styles.block} ${styles.blockUnderlined}`}>
        <h3 className={styles.secondaryTitle}>Legal Requirements</h3>
        <ul>
          <li>
            We aim to comply with relevant privacy laws and regulations, but as
            we do not actively collect or store user data on our servers, our
            primary focus is on ensuring that any data you provide remains
            within your control and is not exposed to third parties.
          </li>
        </ul>
      </div>

      <div className={`${styles.block} ${styles.blockUnderlined}`}>
        <h3 className={styles.secondaryTitle}>Contact Information</h3>
        <ul>
          <li>
            If you have any questions or concerns about this Privacy Policy,
            please contact me via{" "}
            <a target="_blank" href="https://t.me/MrAlex_OFF">
              Telegram
            </a>{" "}
            ,{" "}
            <a target="_blank" href="https://discordapp.com/users/SAUDIO#5715">
              Discord
            </a>{" "}
            or check any other social links on my{" "}
            <a target="_blank" href="https://github.com/fpS-AUDIO">
              Github
            </a>
            . We do not publicly display our email to minimize spam and protect
            privacy.
          </li>
        </ul>
      </div>

      <div className={`${styles.block} ${styles.blockUnderlined}`}>
        <h3 className={styles.secondaryTitle}>
          Changes to This Privacy Policy
        </h3>
        <ul>
          <li>
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
          </li>
        </ul>
      </div>

      <div className={`${styles.block} ${styles.blockUnderlined}`}>
        <h3 className={styles.secondaryTitle}>Acknowledgment</h3>
        <p className={styles.content}>
          By using our web application, you acknowledge that you have read and
          understood this Privacy Policy.
        </p>
      </div>

      <div className={`${styles.block}`}>
        <p className={styles.content}>Effective Date: July 15 2024</p>
      </div>

      <ButtonBack />

      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
