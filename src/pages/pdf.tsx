import { useState } from 'react';
import { modifyPDF } from '../utils/pdf';

export default function PdfPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGeneratePdf = async () => {
    try {
      await modifyPDF('input.pdf', 'output.pdf', [
        { fieldName: 'Name', fieldValue: formData.name },
        { fieldName: 'Email', fieldValue: formData.email },
        { fieldName: 'Phone', fieldValue: formData.phone },
      ]);

      alert('PDF generated successfully!');
    } catch (error) {
      console.error('Error generating PDF', error);
      alert('Error generating PDF');
    }
  };

  return (
    <div>
      <h1>PDF Form</h1>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
      <button onClick={handleGeneratePdf}>Generate PDF</button>
    </div>
  );
}
