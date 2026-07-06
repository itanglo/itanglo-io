import Image from 'next/image'
import { cn } from '@/lib/cn'

export default function Avatar({
  src,
  alt,
  float = false,
}: {
  src: string
  alt: string
  float?: boolean
}) {
  return (
    <div
      className={cn(
        'relative shrink-0',
        'w-[142px] h-[182px] xl:w-[236px] xl:h-[303px]',
        "before:content-[''] before:absolute before:top-0 before:left-0 before:bg-avatar-orange",
        'before:w-[120px] before:h-[146px] xl:before:w-[199px] xl:before:h-[243px]',
        "after:content-[''] after:absolute after:bg-avatar-teal",
        'after:top-[46px] after:left-[17px] after:w-[125px] after:h-[136px]',
        'xl:after:top-[77px] xl:after:left-[28px] xl:after:w-[208px] xl:after:h-[226px]',
        float && 'float-right mb-6 ml-8 max-[600px]:float-none max-[600px]:mt-10 max-[600px]:mx-auto max-[600px]:mb-6',
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={209}
        height={272}
        className="absolute top-[7px] left-[8px] !w-[126px] !h-[163px] object-cover z-[1] xl:top-[12px] xl:left-[13px] xl:!w-[209px] xl:!h-[272px]"
      />
    </div>
  )
}
