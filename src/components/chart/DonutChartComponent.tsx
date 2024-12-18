// 'use client';

import { Card, DonutChart, List, ListItem } from '@tremor/react';

interface DonutChartComponentProps {
  title?: string;
  data: { name: string; amount: number; share: string; color: string }[];
}

function currencyFormatter(number: number): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(number);
}

export function DonutChartComponent({
  title = 'Total expenses by category',
  data = [],
}: DonutChartComponentProps) {
  return (
    <Card className="sm:mx-auto sm:max-w-lg">
      <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        {title}
      </h3>
      <DonutChart
        className="mt-8"
        data={data}
        category="amount"
        index="name"
        valueFormatter={currencyFormatter}
        showTooltip={false}
        colors={data.map((item) => item.color)}
      />
      <p className="mt-8 flex items-center justify-between text-tremor-label text-tremor-content dark:text-dark-tremor-content">
        <span>Category</span>
        <span>Amount / Share</span>
      </p>
      <List className="mt-2">
        {data.map((item) => (
          <ListItem key={item.name} className="space-x-6">
            <div className="flex items-center space-x-2.5 truncate">
              <span className={`${item.color} size-2.5 shrink-0 rounded-sm`} aria-hidden={true} />
              <span className="truncate dark:text-dark-tremor-content-emphasis">
                {item.name}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium tabular-nums text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {currencyFormatter(item.amount)}
              </span>
              <span className="rounded-tremor-small bg-tremor-background-subtle px-1.5 py-0.5 text-tremor-label font-medium tabular-nums text-tremor-content-emphasis dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-emphasis">
                {item.share}
              </span>
            </div>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}

export default DonutChartComponent;