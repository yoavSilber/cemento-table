import { useState } from 'react'

const BUFFER = 3

function VirtualList({ itemCount, itemHeight, height, width, renderItem }) {
  const [scrollTop, setScrollTop] = useState(0)

  const visibleCount = Math.ceil(height / itemHeight)
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - BUFFER)
  const endIndex = Math.min(itemCount - 1, startIndex + visibleCount + BUFFER * 2)

  const totalHeight = itemCount * itemHeight
  const offsetY = startIndex * itemHeight

  return (
    <div
      style={{ height, width, overflowY: 'auto' }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: totalHeight, position: 'relative', width }}>
        <div style={{ position: 'absolute', top: offsetY, width }}>
          {Array.from({ length: endIndex - startIndex + 1 }, (_, i) =>
            renderItem(startIndex + i)
          )}
        </div>
      </div>
    </div>
  )
}

export default VirtualList
