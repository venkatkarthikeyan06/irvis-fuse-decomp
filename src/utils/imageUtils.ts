export const createImageFromFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(e.target.result as string);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

export const generateSampleImage = (type: 'infrared' | 'visible', width = 512, height = 512): string => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Could not get canvas context');
  }

  // Create sample patterns
  if (type === 'infrared') {
    // Create thermal-like gradient
    const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width/2);
    gradient.addColorStop(0, '#ff4444');
    gradient.addColorStop(0.5, '#ff8800');
    gradient.addColorStop(1, '#880000');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Add some noise/texture
    for (let i = 0; i < 1000; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 3;
      ctx.fillStyle = `rgba(255, ${Math.random() * 100 + 100}, 0, ${Math.random() * 0.5})`;
      ctx.fillRect(x, y, size, size);
    }
  } else {
    // Create visible spectrum image
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#4444ff');
    gradient.addColorStop(0.5, '#44ff44');
    gradient.addColorStop(1, '#ff44ff');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Add geometric patterns
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    for (let i = 0; i < 10; i++) {
      ctx.beginPath();
      ctx.arc(
        Math.random() * width,
        Math.random() * height,
        Math.random() * 50 + 10,
        0,
        Math.PI * 2
      );
      ctx.stroke();
    }
  }

  return canvas.toDataURL('image/jpeg', 0.8);
};

export const downloadImage = (dataUrl: string, filename: string) => {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};