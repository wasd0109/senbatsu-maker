import React from 'react'
import Image, { StaticImageData } from 'next/image'

interface ImageCardProps {
    imageSrc: StaticImageData | string
    title: string
    subtitle?: string
    alt?: string
    onClick?: () => void,
    fit?: 'cover' | 'contain';
    selected?: boolean;
    selectedColor?: string;
    className?: string;
    startElement?: React.ReactNode;
    endElement?: React.ReactNode;
}

const ImageCard = React.forwardRef<HTMLDivElement, ImageCardProps>(({
    imageSrc,
    title,
    subtitle,
    alt,
    onClick,
    fit = 'cover',
    selected = false,
    selectedColor,
    className,
    startElement,
    endElement
}, ref) => {
    return (
        <div
            ref={ref}
            onClick={onClick}
            style={{ backgroundColor: selected ? selectedColor : undefined }}
            className={`${selected ? "" : "bg-white hover:bg-gray-50 border-gray-200 border"} transition-colors flex items-center overflow-hidden rounded-lg h-20 w-full max-w-xs ${className}`}
        >
            {startElement && (
                <div className="pl-2">
                    {startElement}
                </div>
            )}
            {/* Image container with fixed height matching button */}
            <div className="relative h-full w-20 shrink-0 overflow-hidden p-1">
                <Image
                    src={imageSrc}
                    alt={alt || title}
                    className={`object-top h-full w-full ${fit === 'cover' ? 'object-cover' : 'object-contain'}`}
                    width={80}
                    height={80}
                />
            </div>

            {/* Text content */}
            <div className="flex flex-col justify-center px-4 text-left flex-1 min-w-0">
                <h1 className="text-lg font-semibold text-gray-900 truncate">
                    {title}
                </h1>
                {subtitle && (
                    <h2 className="text-sm text-gray-600 truncate">
                        {subtitle}
                    </h2>
                )}
            </div>
            {endElement && (
                <div className="pr-4">
                    {endElement}
                </div>
            )}
        </div>
    )
});

ImageCard.displayName = 'ImageCard';

export default ImageCard
