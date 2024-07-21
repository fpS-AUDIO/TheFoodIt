import jsPDF from "jspdf";

export function generatePDF(ingredients, numPortions, logoPath) {
  const doc = new jsPDF();
  const margin = 20;
  let currentY = margin;

  // Set default font to Helvetica
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0); // Set text color to black

  // Function to add footer
  const addFooter = () => {
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text("Generated with https://thefoodit.com/", margin, pageHeight - 10);
  };

  // Create an image element
  const logoImage = new Image();
  logoImage.src = logoPath;

  // Wait for the image to load before proceeding
  logoImage.onload = function () {
    const originalWidth = 1024;
    const originalHeight = 512;
    const desiredWidth = 60; // Adjust this value as needed
    const aspectRatio = originalHeight / originalWidth;
    const desiredHeight = desiredWidth * aspectRatio;

    doc.addImage(
      logoImage,
      "PNG",
      margin,
      currentY,
      desiredWidth,
      desiredHeight
    );
    currentY += desiredHeight + 10;

    // Add title below the logo
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(`Ingredients per ${numPortions} portions:`, margin, currentY);
    currentY += 10;

    // Add ingredients details
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    ingredients.forEach((ingredient) => {
      const ingredientLine = `${ingredient.name}: ${ingredient.quantity} ${ingredient.unit}`;
      doc.text(ingredientLine, margin, currentY);
      currentY += 10;
    });

    // Add footer
    addFooter();

    // Save the PDF
    doc.save("recipe-scaler-report.pdf");
  };
}
