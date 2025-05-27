const ColorList = [
    "#f56a00", // Orange
    "#7265e6", // Purple
    "#ffbf00", // Yellow
    "#00a2ae", // Teal
    "#8bc34a", // Light Green
    "#e91e63", // Pink
    "#1a237e", // Dark Blue
    "#4a148c", // Dark Purple
    "#880e4f", // Dark Red
    "#3e2723", // Dark Brown
    "#0d47a1", // Darker Blue
    "#004d40", // Dark Teal
  ];
  
  export const getColorByLetter = (letter: string) => {
    const charCode = letter.toUpperCase().charCodeAt(0);
  
    if (charCode < 65 || charCode > 90) return ColorList[ColorList.length - 1]; // Default for non A-Z
  
    // Distribute colors dynamically based on letter groups
    const index = Math.floor((charCode - 65) / (26 / ColorList.length));
    return ColorList[index];
  };
  