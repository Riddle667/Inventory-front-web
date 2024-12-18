'use client';

import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react';

/**
 * Componente de tabla reutilizable y dinámico.
 * @param {Object[]} columns - Definición de columnas [{ header: string, accessor: string }]
 * @param {Object[]} data - Datos para la tabla [{ clave1: valor1, clave2: valor2 }]
 * @param {string} emptyMessage - Mensaje mostrado cuando no hay datos.
 */
interface Column {
  header: string;
  accessor: string;
}

interface DynamicTableProps {
  columns: Column[];
  data: Record<string, number>[];
  emptyMessage?: string;
}

const DynamicTable = ({ columns, data, emptyMessage = 'No data available.' }: DynamicTableProps) => {
  return (
    <Table className="mt-8">
      <TableHead>
        <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
          {columns.map((column) => (
            <TableHeaderCell
              key={column.accessor}
              className="text-tremor-content-strong dark:text-dark-tremor-content-strong"
            >
              {column.header}
            </TableHeaderCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data && data.length > 0 ? (
          data.map((row, rowIndex) => (
            <TableRow
              key={row.id || rowIndex}
              className="even:bg-tremor-background-muted even:dark:bg-dark-tremor-background-muted"
            >
              {columns.map((column) => (
                <TableCell key={column.accessor}>
                  {typeof row[column.accessor] === 'number' ? new Intl.NumberFormat("es-CL").format(row[column.accessor]) : row[column.accessor] || '-'}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center">
              {emptyMessage}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

DynamicTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  emptyMessage: PropTypes.string,
};

export default DynamicTable;
