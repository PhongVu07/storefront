import html2canvas from "html2canvas";

export const downloadImage = async (element: HTMLElement, filename: string = 'preview.png') => {
  const canvas = await html2canvas(element, {
    allowTaint: true,
    useCORS: true,
  });
  const image = canvas.toDataURL("image/png");

  const fakeLink = window.document.createElement("a");
  fakeLink.setAttribute('style', 'display:none;')
  fakeLink.download = filename;
  fakeLink.href = image;
  document.body.appendChild(fakeLink);
  fakeLink.click();
  document.body.removeChild(fakeLink);
  fakeLink.remove();
}

export const getImageBlog = async (element: HTMLElement | null) => {
  if (element) {
    const canvas = await html2canvas(element, {
      allowTaint: true,
      useCORS: true,
    });
    const image = canvas.toDataURL("image/jpeg");
    return image
  }
}