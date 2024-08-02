import jsPDF from "jspdf";

export function generatePDF(userKcalFormData, statsResults, logoPath) {
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
    doc.text("Personal Stats", margin, currentY);
    currentY += 10;

    // Add personal details
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Gender: ${userKcalFormData.gender}`, margin, currentY);
    currentY += 10;
    doc.text(`Age: ${userKcalFormData.age} y.o.`, margin, currentY);
    currentY += 10;
    doc.text(`Height: ${userKcalFormData.height} cm`, margin, currentY);
    currentY += 10;
    doc.text(`Weight: ${userKcalFormData.weight} kg`, margin, currentY);
    currentY += 10;
    doc.text(`Activity Multiplier: ${userKcalFormData.pal}`, margin, currentY);
    currentY += 10;
    doc.text(`Goal: ${userKcalFormData.goal}`, margin, currentY);
    currentY += 10;

    // Draw a line before kcal stats section
    doc.line(margin, currentY, margin + lineWidth, currentY);
    currentY += 10;

    // Add title for kcal stats
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Kcal Stats", margin, currentY);
    currentY += 10;

    // Add kcal stats details
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`BMI: ${statsResults.bmi.toFixed(2)}`, margin, currentY);
    currentY += 10;
    doc.text(`BMR: ${statsResults.bmr} kcal`, margin, currentY);
    currentY += 10;
    doc.text(`TDEE: ${statsResults.tdee.toFixed(2)} kcal`, margin, currentY);
    currentY += 10;
    doc.text(
      `TDEE with TEF: ${statsResults.tdeeWithTEF.toFixed(2)} kcal`,
      margin,
      currentY
    );
    currentY += 10;

    // Draw a line before macronutrient distribution section
    doc.line(margin, currentY, margin + lineWidth, currentY);
    currentY += 10;

    // Add macronutrient distribution section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Macronutrient Distribution", margin, currentY);
    currentY += 10;

    // Add macronutrient distribution details
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(
      `Carbs: ${statsResults.macronutrientsDistribution.carbs}g`,
      margin,
      currentY
    );
    currentY += 10;
    doc.text(
      `Proteins: ${statsResults.macronutrientsDistribution.proteins}g`,
      margin,
      currentY
    );
    currentY += 10;
    doc.text(
      `Fats: ${statsResults.macronutrientsDistribution.fats}g`,
      margin,
      currentY
    );
    currentY += 10;

    // Add footer
    addFooter();

    // Save the PDF
    doc.save("kcal-stats-report.pdf");
  };
}
