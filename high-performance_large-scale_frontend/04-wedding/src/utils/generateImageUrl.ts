export default function generateImageUrl({
  filename,
  format,
  option = 'q_auto,c_fill',
}: {
  filename: string
  format: 'jpg' | 'webp'
  option?: string
}) {
  return `https://res.cloudinary.com/dctuqhmv9/image/upload/${option}/v1712063810/${format}/${filename}.${format}`
}
