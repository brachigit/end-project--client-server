import { createContext, useContext, useState } from 'react';

const PdfContext = createContext();

export const PdfProvider = ({ children }) => {
  const [selections, setSelections] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    snack: []
  })

  const updateMeal = (mealName, line) => {
    console.log("updateMeal called:", mealName, line);
    setSelections((prev) => ({
      ...prev,
      [mealName]: [...prev[mealName].filter(item => item !== line), line] // אין כפילויות
    }))}

  const getPdfContent = () => {
    const all = [];
    for (const meal in selections) {
      if (selections[meal].length > 0) {
        all.push(`=== ${meal.toUpperCase()} ===`);
        all.push(...selections[meal]);
        all.push('');
      }
    }
    all.push('מה חשוב לדעת בתפריט דיאטה 1200 קלוריות:');
  all.push('מומלץ להתחיל לאכול את הארוחה הראשונה עד שעה מהיקיצה.');
  all.push('המרווח בין הארוחות נע בין שעה וחצי לשלוש שעות.');
  all.push('אין חשיבות לסדר הארוחות. ניתן להחליף ארוחה אחת בארוחה שניה במלואה.');
  all.push('לא ניתן לפצל, לצרף או לדלג על ארוחות.');
  all.push('מנה מותרת בנוסף לתפריט פעם בשבוע.');
  all.push('כוס חלב ביום לקפה.');
  all.push('ירקות ניתן לשלב בכל ארוחה בשפיות ובצלילות הדעת.');
  all.push('יש לשתות מינימום 12 כוסות מים ביום (אפשר לגוון עם תה צמחים או סודה).');
  all.push('מומלץ לשתות כוס מים לפני ואחרי כל ארוחה.');
  all.push('חשוב לדייק בכמויות.');
  all.push('מומלץ לגוון את הארוחות עם תחליפים הנמצאים בחוברת ובאתר.');
  all.push('מומלץ ללכת ברגל 3 פעמים בשבוע למשך שעה.');
  all.push('מזון המכיל ממתיק מלאכותי יש לצרוך בכמויות מבוקרות.');
  all.push('מומלץ שהלחם והפחמימות יהיו מדגנים מלאים (כלחם, אורז, פסטה ועוד).');
  all.push('');
  all.push('מחפשים תפריט בריא? תפריטי הדיאטה באתר חלי ממן, לרבות תפריט לדיאטה 1200 קלוריות לירידה במשקל, אינם מתאימים לכל הנשים והגברים באופן גורף – ולכן יש להיצמד להוראות המנחים להתאמת תפריט לתזונה נכונה עבורכם.');
  all.push('** התפריט אינו המלצה רפואית. יש להתייעץ עם הרופא המטפל על מנת לוודא כי אין מניעה רפואית. ט.ל.ח.');
  all.push('התפריטים לשימוש אישי בלבד.');
  all.push('');

  
return all;    
  };

  return (
    <PdfContext.Provider value={{ updateMeal, getPdfContent }}>
      {children}
    </PdfContext.Provider>
  );
};

export const usePdf = () => useContext(PdfContext);