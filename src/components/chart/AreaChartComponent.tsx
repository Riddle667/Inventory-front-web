// 'use client';

import { AreaChart, Card, List, ListItem } from '@tremor/react';

interface AreaChartComponentProps {
  title?: string;
  data: DataEntry[];
  categories: string[];
  summary: { name: string; value: number }[];
  colors: string[];
  index: string;
}

interface DataEntry {
  date: string;
  [key: string]: number | string;
}

function valueFormatter(number: number): string {
  return new Intl.NumberFormat('es-CL', {
    maximumFractionDigits: 0,
    notation: 'standard',
    style: 'currency',
    currency: 'CLP',
  }).format(number);
}

export function AreaChartComponent({
  title = 'Area Chart',
  data = [],
  categories = [],
  summary = [],
  colors = [],
  index = 'date',
}: AreaChartComponentProps) {
  return (
    <Card className="sm:mx-auto sm:max-w-lg">
      <h3 className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        {title}
      </h3>
      <AreaChart
        data={data}
        index={index}
        categories={categories}
        colors={colors}
        valueFormatter={valueFormatter}
        showLegend={false}
        showYAxis={false}
        showGradient={false}
        startEndOnly={true}
        className="mt-6 h-32"
      />
      <List className="mt-2">
        {summary.map((item) => (
          <ListItem key={item.name}>
            <div className="flex items-center space-x-2">
              <span className="h-0.5 w-3 bg-blue-500" aria-hidden={true} />
              <span>{item.name}</span>
            </div>
            <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              {valueFormatter(item.value)}
            </span>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}