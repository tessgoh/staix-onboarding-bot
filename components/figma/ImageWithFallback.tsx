import React, { useState } from 'react'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false)
  const [isRetrying, setIsRetrying] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const [currentSrc, setCurrentSrc] = useState(props.src)

  const handleError = () => {
    setDidError(true)
  }

  const handleRetry = () => {
    if (retryCount >= 3) return
    
    setIsRetrying(true)
    setRetryCount(prev => prev + 1)
    setDidError(false)
    
    // Force reload by adding timestamp to URL
    const timestamp = Date.now()
    const separator = props.src?.includes('?') ? '&' : '?'
    const newSrc = `${props.src}${separator}_retry=${timestamp}`
    
    // Update the current source to trigger a reload
    setCurrentSrc(newSrc)
    
    // Reset retrying state after a short delay
    setTimeout(() => {
      setIsRetrying(false)
    }, 1000)
  }

  const { src, alt, style, className, ...rest } = props

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex flex-col items-center justify-center w-full h-full p-4">
        <img src={ERROR_IMG_SRC} alt="Error loading image" className="mb-2" data-original-url={src} />
        <p className="text-sm text-gray-600 mb-2">이미지를 불러올 수 없습니다</p>
        <button
          onClick={handleRetry}
          disabled={isRetrying || retryCount >= 3}
          className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isRetrying ? '재시도 중...' : '다시 시도'}
        </button>
        {retryCount >= 3 && (
          <p className="text-xs text-gray-500 mt-1">최대 재시도 횟수에 도달했습니다</p>
        )}
      </div>
    </div>
  ) : (
    <img 
      src={currentSrc} 
      alt={alt} 
      className={className} 
      style={style} 
      {...rest} 
      onError={handleError}
      onLoad={() => {
        setIsRetrying(false)
        setDidError(false)
      }}
    />
  )
}
