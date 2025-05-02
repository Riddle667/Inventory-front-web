import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export const UserView = () => {

  return (
        <div className="w-full max-w-6xl mx-auto py-8 px-4 md:px-6">
          <header className="mb-6">
            <h1 className="text-2xl font-bold">Clientes</h1>
            <p className="text-muted-foreground">
              Información detallada de todos los clientes.
            </p>
          </header>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Dirección</TableHead>
                  <TableHead>
                    <span className="sr-only">Detalles</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">John Doe</TableCell>
                  <TableCell>john.doe@example.com</TableCell>
                  <TableCell>+1 (555) 123-4567</TableCell>
                  <TableCell>123 Main St, Anytown USA</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Ver detalles
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Jane Smith</TableCell>
                  <TableCell>jane.smith@example.com</TableCell>
                  <TableCell>+1 (555) 987-6543</TableCell>
                  <TableCell>456 Oak Rd, Somewhere City</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Ver detalles
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Bob Johnson</TableCell>
                  <TableCell>bob.johnson@example.com</TableCell>
                  <TableCell>+1 (555) 321-7890</TableCell>
                  <TableCell>789 Elm St, Othertown</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Ver detalles
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Samantha Lee</TableCell>
                  <TableCell>samantha.lee@example.com</TableCell>
                  <TableCell>+1 (555) 654-0987</TableCell>
                  <TableCell>321 Oak Ln, Somewhere Else</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Ver detalles
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Michael Chen</TableCell>
                  <TableCell>michael.chen@example.com</TableCell>
                  <TableCell>+1 (555) 789-2345</TableCell>
                  <TableCell>159 Maple Ave, Anytown</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Ver detalles
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
  );
};
