import { scaleBand, scaleLinear } from '@visx/scale'
import { format, parseISO } from 'date-fns'
import { memo, useMemo } from 'react'
import { AxisBottom } from '@visx/axis'
import { Group } from '@visx/group'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { Bar } from '@visx/shape'
import { colors } from '@/styles/colorPlatte'

// 월별 데이터
// 날짜
// 잔고
interface chartDate {
  date: string
  balance: number
}

interface MonthChartProps {
  chartDate: chartDate[]
  width: number
  height: number
}

// accessors
const getX = (d: chartDate) => d.date
const getY = (d: chartDate) => Number(d.balance) * 100
const formatDate = (date: string) => format(parseISO(date), 'M월')

const verticalMargin = 120

function MonthlyChart({ chartDate, width, height }: MonthChartProps) {
  // bounds
  const xMax = width
  const yMax = height - verticalMargin

  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: chartDate.map(getX),
        padding: 0.4,
      }),
    [chartDate, xMax],
  )

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...chartDate.map(getY))],
      }),
    [chartDate, yMax],
  )

  return width < 10 ? null : (
    <svg width={width} height={height}>
      {/* <GradientTealBlue id="teal" /> */}
      <rect width={width} height={height} fill="url(#teal)" rx={14} />
      <Group top={verticalMargin / 2}>
        {chartDate.map((d) => {
          const letter = getX(d)
          const barWidth = xScale.bandwidth()
          const barHeight = yMax - (yScale(getY(d)) ?? 0)
          const barX = xScale(letter)
          const barY = yMax - barHeight
          return (
            <Bar
              key={`bar-${letter}`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill={colors.blue}
            />
          )
        })}
        <AxisBottom
          top={yMax + 20}
          scale={xScale}
          tickFormat={formatDate}
          stroke={colors.blue}
          tickStroke={colors.blue}
          tickLabelProps={{
            fill: colors.blue,
            fontSize: 14,
            textAnchor: 'middle',
          }}
        />
      </Group>
    </svg>
  )
}

interface ChartWrapperProps {
  height: number
  chartDate: chartDate[]
}
function ChartWrapper({ height = 200, chartDate }: ChartWrapperProps) {
  return (
    <ParentSize>
      {({ width }) => (
        <MonthlyChart width={width} chartDate={chartDate} height={height} />
      )}
    </ParentSize>
  )
}

export default memo(ChartWrapper)
