import styles from "./PrivacyPolicy.module.css";

import ButtonBack from "../../components/ButtonBack/ButtonBack";
import Footer from "../../components/Footer/Footer";

function PrivacyPolicy() {
  return (
    <div className={styles.wrapper}>
      <ButtonBack />

      <h2 className={styles.mainTitle}>Privacy Policy</h2>

      <div className={`${styles.block} ${styles.blockUnderlined}`}>
        <h3 className={styles.secondaryTitle}>Data Collection</h3>
        <p className={styles.content}>
          I collect the following personal and non-personal information to
          provide my services with your explicit consent:
        </p>
        <ul>
          <li>Gender</li>
          <li>Height</li>
          <li>Weight</li>
          <li>Age</li>
          <li>Physical Activity Level</li>
          <li>Health and Fitness Goal</li>
          <li>
            Dish Information: Ingredients, ingredient costs, weight, selling
            price, etc., for calculating food cost.
          </li>
          <li>
            Theme Preference: Your preferred display theme (dark or light mode).
          </li>
          <li>
            Privacy Consent: Whether you have accepted the privacy policy to
            avoid showing the disclaimer banner repeatedly.
          </li>
        </ul>
        <p className={styles.content}>
          This data is collected through forms that you voluntarily fill out to
          receive personalized services, such as nutrition and fitness
          calculations, food cost analysis, and user interface preferences.
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
          <li>
            Food Cost Calculator: Calculate and store the cost of ingredients
            for your recipes.
          </li>
          <li>
            Recipe Scaler: Adjust ingredient quantities based on the desired
            number of portions.
          </li>
          <li>
            Nutrition Finder: Provides detailed nutritional information using
            data from the USDA Food and Nutrient Database for Dietary Studies
            (FNDDS).
          </li>
          <li>
            Theme Preference: Stores your preferred display theme (dark or light
            mode).
          </li>
          <li>
            Privacy Consent: Stores your consent to the privacy policy to
            prevent the disclaimer banner from showing repeatedly.
          </li>
        </ul>
        <p className={styles.content}>
          Your data is only used for these purposes and is not shared with third
          parties.
        </p>
      </div>

      <div className={`${styles.block} ${styles.blockUnderlined}`}>
        <h3 className={styles.secondaryTitle}>Data Storage and Security</h3>
        <ul>
          <li>
            Your data is stored locally in your browser's local storage. If
            local storage is unavailable, data is stored within the session.
          </li>
          <li>I do not store your personal data on external servers.</li>
          <li>
            Your data is only accessible within your browser and is not shared
            with third parties.
          </li>
          <li>
            Your last food cost calculations, theme preference, and privacy
            consent are saved in local storage for convenience.
          </li>
        </ul>
        <p className={styles.content}>
          Although I strive to protect your data, no method of electronic
          storage is completely secure. Therefore, I cannot guarantee absolute
          security. I recommend using the latest browser versions to maximize
          protection.
        </p>
      </div>

      <div className={`${styles.block} ${styles.blockUnderlined}`}>
        <h3 className={styles.secondaryTitle}>Third-Party Services</h3>
        <ul>
          <li>
            The application uses third-party libraries like{" "}
            <a
              target="_blank"
              href="https://www.npmjs.com/package/convert-units"
              rel="noopener noreferrer"
            >
              convert-units
            </a>{" "}
            to provide specific functionalities. These libraries do not collect
            or store your personal data.
          </li>
          <li>
            I use the{" "}
            <a
              target="_blank"
              href="https://github.com/parallax/jsPDF"
              rel="noopener noreferrer"
            >
              jsPDF
            </a>{" "}
            library to generate PDF documents for the Food Cost Calculator,
            KCALCULATOR, and Recipe Scaler features. This library does not
            collect or store your personal data.
          </li>
          <li>
            My website is hosted on{" "}
            <a
              target="_blank"
              href="https://www.netlify.com/"
              rel="noopener noreferrer"
            >
              Netlify
            </a>
            , and I use a custom domain purchased from{" "}
            <a
              target="_blank"
              href="https://www.namecheap.com/"
              rel="noopener noreferrer"
            >
              Namecheap
            </a>
            . These services may collect non-personal data for operational
            purposes. Please refer to their respective privacy policies for more
            information.
          </li>
        </ul>
      </div>

      <div className={`${styles.block} ${styles.blockUnderlined}`}>
        <h3 className={styles.secondaryTitle}>Data Source Acknowledgment</h3>
        <ul>
          <li>
            The nutritional data provided in the Nutrition Finder feature is
            sourced from the USDA Food and Nutrient Database for Dietary Studies
            (FNDDS). The data includes information on various dishes and is used
            to provide users with detailed nutritional content. The source is
            cited as follows: "U.S. Department of Agriculture, Agricultural
            Research Service. 2022. USDA Food and Nutrient Database for Dietary
            Studies 2019-2020. Food Surveys Research Group Home Page,
            http://www.ars.usda.gov/nea/bhnrc/fsrg."
          </li>
        </ul>
      </div>

      <div className={`${styles.block} ${styles.blockUnderlined}`}>
        <h3 className={styles.secondaryTitle}>Generated Content</h3>
        <ul>
          <li>
            Some content on the site, such as feature descriptions, is generated
            using AI tools like ChatGPT. This content generation does not
            involve the collection or storage of personal data.
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
            If you clear your browser's local storage, all data collected by
            this application will be deleted.
          </li>
        </ul>
      </div>

      <div className={`${styles.block} ${styles.blockUnderlined}`}>
        <h3 className={styles.secondaryTitle}>Children's Privacy</h3>
        <p className={styles.content}>
          This application is not intended for use by children under the age of
          13. I do not knowingly collect personal data from children. By using
          this application and agreeing to this Privacy Policy, you confirm that
          you are at least 13 years old.
        </p>
      </div>

      <div className={`${styles.block} ${styles.blockUnderlined}`}>
        <h3 className={styles.secondaryTitle}>Contact Information</h3>
        <ul>
          <li>
            If you have any questions or concerns about this Privacy Policy,
            please contact me via{" "}
            <a
              target="_blank"
              href="https://t.me/MrAlex_OFF"
              rel="noopener noreferrer"
            >
              Telegram
            </a>
            ,{" "}
            <a
              target="_blank"
              href="https://discordapp.com/users/SAUDIO#5715"
              rel="noopener noreferrer"
            >
              Discord
            </a>
            , or through any other social links on my{" "}
            <a
              target="_blank"
              href="https://github.com/fpS-AUDIO"
              rel="noopener noreferrer"
            >
              Github
            </a>
            . I do not publicly display my email to minimize spam and protect
            privacy.
          </li>
          <li>
            For users in the European Union, you have the right to lodge a
            complaint with your local data protection authority.
          </li>
        </ul>
      </div>

      <div className={`${styles.block} ${styles.blockUnderlined}`}>
        <h3 className={styles.secondaryTitle}>
          Changes to This Privacy Policy
        </h3>
        <ul>
          <li>
            I may update this Privacy Policy from time to time. You are advised
            to review this Privacy Policy periodically for any changes. Changes
            to this Privacy Policy are effective when posted on this page.
          </li>
        </ul>
      </div>

      <div className={`${styles.block}`}>
        <p className={styles.content}>Effective Date: August 22, 2024</p>
      </div>

      <ButtonBack />

      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
