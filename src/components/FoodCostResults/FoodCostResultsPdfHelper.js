import jsPDF from "jspdf";

export function generatePDF(userFoodCostData, logoPath) {
  const doc = new jsPDF();
  const margin = 20;
  const pageWidth = doc.internal.pageSize.width;
  const lineWidth = pageWidth - margin * 2;
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
    doc.text("Dish", margin, currentY);
    currentY += 10;

    // Add dish details
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Name: ${userFoodCostData.dishName}`, margin, currentY);
    currentY += 10;
    doc.text(
      `Selling Price: ${userFoodCostData.sellingPrice.toFixed(2)} €`,
      margin,
      currentY
    );
    currentY += 10;

    // Draw a line before ingredients section
    doc.line(margin, currentY, margin + lineWidth, currentY);
    currentY += 10;

    // Add section for ingredients
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Ingredients (per portion)", margin, currentY);
    currentY += 10;

    // Add ingredients table
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    userFoodCostData.ingredients.forEach((ingredient) => {
      const ingredientLine = `${
        ingredient.name
      }: ${ingredient.onePortionValue.toFixed(2)} ${ingredient.baseUnit} at ${
        ingredient.price
      } € / ${ingredient.priceUnit} - ${ingredient.finalCostPerPortion.toFixed(
        2
      )} €`;
      doc.text(ingredientLine, margin, currentY);
      currentY += 10;
    });

    // Draw a line before results section
    currentY += 5;
    doc.line(margin, currentY, margin + lineWidth, currentY);
    currentY += 10;

    // Add results section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Results", margin, currentY);
    currentY += 10;
``
    // Add results details
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(
      `Total ingredients costs: ${userFoodCostData.totalIngredientsCost.toFixed(
        2
      )} €`,
      margin,
      currentY
    );
    currentY += 10;
    doc.text(
      `Food Cost: ${userFoodCostData.foodCostPercentage.toFixed(2)} %`,
      margin,
      currentY
    );
    currentY += 10;

    // Add footer
    addFooter();

    // Save the PDF
    doc.save("food-cost-report.pdf");
  };
}
