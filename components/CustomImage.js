import Image from 'next/image';

export default function CustomImage({
  src,
  alt = 'alt',
  width = 800,
  height = 350,
  ...props
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      // Set quality as per need
      quality={70}
      {...props}
    />
  );
}
