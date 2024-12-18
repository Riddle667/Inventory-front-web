// 'use client';

import { useState } from 'react';
import { BarChart, Card, Divider, Switch } from '@tremor/react';


interface BarChartComponentProps {
  title?: string;
  description?: string;
  data: DataEntry[]; // Lista de objetos para los datos del gráfico
  defaultCategories: string[]; // Categorías visibles por defecto
  comparisonCategories: string[]; // Categorías adicionales para comparación
  colors: string[]; // Colores asociados a las categorías por defecto
  comparisonColors: string[]; // Colores asociados a las categorías de comparación
  index: string; // Índice para agrupar datos (e.g., "date")
}

interface DataEntry {
  date: string;
  [key: string]: number | string; // Cada categoría será una clave con valores numéricos, excepto 'date'
}

function valueFormatter(number: number): string {
  const formatter = new Intl.NumberFormat('es-CL', {
    maximumFractionDigits: 0,
    notation: 'standard',
    compactDisplay: 'long',
    style: 'currency',
    currency: 'CLP',
  });

  return formatter.format(number);
}

export default function BarChartComponent({
  title = 'Bar Chart',
  description = '',
  data = [],
  defaultCategories = [],
  comparisonCategories = [],
  colors = [],
  comparisonColors = [],
  index = 'date',
}: BarChartComponentProps) {
  const [showComparison, setShowComparison] = useState(false);
  return (
    <Card className="sm:mx-auto sm:max-w-2xl">
      <h3 className="ml-1 mr-1 font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
        {title}
      </h3>
      {description && (
        <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          {description}
        </p>
      )}
      <BarChart
        data={data}
        index={index}
        categories={showComparison ? comparisonCategories : defaultCategories}
        colors={showComparison ? comparisonColors : colors}
        valueFormatter={valueFormatter}
        yAxisWidth={70}
        className="mt-6 hidden h-60 sm:block"
      />
      <BarChart
        data={data}
        index={index}
        categories={showComparison ? comparisonCategories : defaultCategories}
        colors={showComparison ? comparisonColors : colors}
        valueFormatter={valueFormatter}
        showYAxis={false}
        className="mt-4 h-56 sm:hidden"
      />
      {showComparison && (
        <>
          <Divider />
          <div className="mb-2 flex items-center space-x-3">
            <Switch
              id="comparison"
              onChange={() => setShowComparison(!showComparison)}
            />
            <label
              htmlFor="comparison"
              className="text-tremor-default text-tremor-content dark:text-dark-tremor-content"
            >
              Mostrar comparación de datos del año pasado
            </label>
          </div>
        </>
      )}
      
    </Card>
  );
}

