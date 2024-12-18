// 'use client';

import { Card, LineChart, List, ListItem } from '@tremor/react';

interface DataEntry {
  [key: string]: number | string;
}

interface LineChartComponentProps {
  title?: string;
  data: DataEntry[];
  categories: string[];
  summary: { name: string; value: number }[];
  colors: string[];
  index: string;
}

function valueFormatter(number: number): string {
  return new Intl.NumberFormat('es-CL', {
    maximumFractionDigits: 0,
    notation: 'standard',
    style: 'currency',
    currency: 'CLP',
  }).format(number);
}

export function LineChartComponent({
  title = 'Units sold by channel',
  data = [],
  categories = [],
  summary = [],
  colors = [],
  index = 'date',
}: LineChartComponentProps) {
  return (
    <Card className="sm:mx-auto sm:max-w-md">
      <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        {title}
      </h3>
      <LineChart
        data={data}
        index={index}
        categories={categories}
        colors={colors}
        valueFormatter={valueFormatter}
        showLegend={false}
        showYAxis={false}
        startEndOnly={true}
        className="mt-6 h-32"
      />
      <List className="mt-2">
        {summary.map((item) => (
          <ListItem key={item.name}>
            <div className="flex items-center space-x-2">
              <span className="h-0.5 w-3 bg-blue-500" aria-hidden={true} />
              <span className="truncate dark:text-dark-tremor-content-emphasis">
                {item.name}
              </span>
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
