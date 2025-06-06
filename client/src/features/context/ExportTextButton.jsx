import React, { useEffect, useState } from 'react';
import { usePdf } from './PdfProvider';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { useSendPdfToEmailMutation } from '../nutrition/nutritionApiSlice'; // ודא שהנתיב נכון

const ExportTextButton = () => {
  const token = useSelector((state) => state.auth.token);
  const { getPdfContent } = usePdf();
  const [email, setEmail] = useState(null);

  const [sendPdfToEmail, { isLoading, isSuccess, isError }] = useSendPdfToEmailMutation();

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setEmail(decoded.email);
        console.log("Decoded email:", decoded.email);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, [token]);

  const handleSend = async () => {
    const content = getPdfContent();
    if (!email) {
      alert('לא ניתן לשלוח – לא נמצאה כתובת מייל מהטוקן');
      return;
    }
    try {
      await sendPdfToEmail({ email, pdfContent: content });
      alert('המייל נשלח בהצלחה!');
    } catch (err) {
      alert('שליחת המייל נכשלה');
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={handleSend} disabled={isLoading}>
        שלח סיכום במייל
      </button>
      {isSuccess && <p>✅ המייל נשלח</p>}
      {isError && <p>❌ שגיאה בשליחה</p>}
    </div>
  );
};

export default ExportTextButton;
