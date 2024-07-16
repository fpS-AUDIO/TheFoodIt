import { useEffect } from "react";
import styles from "./Advertisement01.module.css";

// Advertisement01 component defined as a function declaration
function Advertisement01() {
  // State to manage the visibility of the ad box

  // useEffect hook to handle side effects like script loading
  useEffect(function () {
    // Create a new script element
    const script = document.createElement("script");

    // Set the script source to the Google AdSense script URL
    script.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    script.async = true; // Set the script to load asynchronously
    script.crossOrigin = "anonymous"; // Set cross-origin to anonymous

    // Define the onload event handler to push the ad
    script.onload = function () {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    };

    // Append the script to the document body
    document.body.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return function cleanup() {
      document.body.removeChild(script);
    };
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div className={styles.advertisementBox}>
      {/* AdSense ins element for displaying the ad */}
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-4498524473222620"
        data-ad-slot="5720346212"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}

// Export the component as default
export default Advertisement01;
