import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Package, DollarSign, TrendingUp, AlertCircle } from "lucide-react";

// Mock data
const mockProducts = [
  {
    id: 1,
    name: "HPE ProLiant DL380 Gen11",
    category: "Servers",
    brand: "HPE",
    sku: "HPE-DL380-G11-001",
    price: "€8,450",
    stock: 15,
    status: "active",
    description: "2U rack server with Intel Xeon processors",
    specifications: [
      "Intel Xeon Scalable processors",
      "Up to 4TB DDR5 memory",
      "12Gb/s SAS/SATA drives",
      "iLO 6 management"
    ],
    warranty: "3 years",
    supplier: "HPE Nordic",
    lastOrdered: "2024-01-10"
  },
  {
    id: 2,
    name: "Cisco Catalyst 9300-48P",
    category: "Networking",
    brand: "Cisco",
    sku: "C9300-48P-A",
    price: "€3,200",
    stock: 8,
    status: "active",
    description: "48-port PoE+ switch with advanced security",
    specifications: [
      "48 x 1G PoE+ ports",
      "4 x 10G SFP+ uplinks",
      "Advanced threat defense",
      "DNA Center ready"
    ],
    warranty: "Lifetime",
    supplier: "Cisco Nordic",
    lastOrdered: "2024-01-08"
  },
  {
    id: 3,
    name: "Dell EMC PowerEdge R750",
    category: "Servers",
    brand: "Dell",
    sku: "DELL-R750-001",
    price: "€7,800",
    stock: 3,
    status: "low-stock",
    description: "2U dual-socket server for demanding workloads",
    specifications: [
      "3rd Gen Intel Xeon processors",
      "Up to 8TB DDR4 memory",
      "NVMe and SAS/SATA support",
      "iDRAC9 with Lifecycle Controller"
    ],
    warranty: "3 years",
    supplier: "Dell Technologies",
    lastOrdered: "2023-12-15"
  },
  {
    id: 4,
    name: "Fortinet FortiGate 600E",
    category: "Security",
    brand: "Fortinet",
    sku: "FG-600E",
    price: "€12,500",
    stock: 5,
    status: "active",
    description: "Next-generation firewall with SD-WAN",
    specifications: [
      "10 Gbps firewall throughput",
      "2.5 Gbps VPN throughput",
      "16 x GE RJ45 ports",
      "4 x 10GE SFP+ slots"
    ],
    warranty: "3 years",
    supplier: "Fortinet Nordic",
    lastOrdered: "2024-01-05"
  },
  {
    id: 5,
    name: "NetApp AFF A250",
    category: "Storage",
    brand: "NetApp",
    sku: "AFF-A250-001",
    price: "€15,600",
    stock: 0,
    status: "out-of-stock",
    description: "All-flash storage system for small to medium deployments",
    specifications: [
      "All-flash architecture",
      "Up to 440TB capacity",
      "10GbE and 25GbE connectivity",
      "ONTAP data management"
    ],
    warranty: "3 years",
    supplier: "NetApp Nordic",
    lastOrdered: "2023-11-20"
  }
];

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<typeof mockProducts[0] | null>(null);
  const [filterCategory, setFilterCategory] = useState("All");

  const categories = ["All", "Servers", "Networking", "Security", "Storage"];

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "All" || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 border-green-200";
      case "low-stock": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "out-of-stock": return "bg-red-100 text-red-800 border-red-200";
      case "discontinued": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStockIcon = (status: string) => {
    switch (status) {
      case "low-stock": return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case "out-of-stock": return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <Package className="h-4 w-4 text-green-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground">Manage your product catalog and inventory</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="flex gap-6">
        {/* Products List */}
        <div className="flex-1">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex space-x-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={filterCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedProduct?.id === product.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-medium text-foreground">{product.name}</h3>
                          <Badge variant="outline">{product.brand}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{product.description}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-3 w-3 text-muted-foreground" />
                            <span className="font-medium">{product.price}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            {getStockIcon(product.status)}
                            <span className={product.stock === 0 ? "text-red-600" : product.stock < 5 ? "text-yellow-600" : "text-green-600"}>
                              {product.stock} in stock
                            </span>
                          </div>
                          <span className="text-muted-foreground">SKU: {product.sku}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Badge className={getStatusColor(product.status)}>
                          {product.status.replace("-", " ")}
                        </Badge>
                        <Badge variant="outline">{product.category}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Details */}
        {selectedProduct && (
          <div className="w-80">
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-lg">{selectedProduct.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedProduct.description}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Price:</span>
                    <span className="text-sm font-bold text-green-600">{selectedProduct.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Stock:</span>
                    <span className={`text-sm font-medium ${
                      selectedProduct.stock === 0 ? "text-red-600" : 
                      selectedProduct.stock < 5 ? "text-yellow-600" : "text-green-600"
                    }`}>
                      {selectedProduct.stock} units
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">SKU:</span>
                    <span className="text-sm">{selectedProduct.sku}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Brand:</span>
                    <span className="text-sm">{selectedProduct.brand}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Category:</span>
                    <span className="text-sm">{selectedProduct.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Warranty:</span>
                    <span className="text-sm">{selectedProduct.warranty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Supplier:</span>
                    <span className="text-sm">{selectedProduct.supplier}</span>
                  </div>
                </div>

                <div>
                  <Badge className={getStatusColor(selectedProduct.status)}>
                    {selectedProduct.status.replace("-", " ")}
                  </Badge>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Specifications</h4>
                  <ul className="text-sm space-y-1">
                    {selectedProduct.specifications.map((spec, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Last ordered: {selectedProduct.lastOrdered}
                  </p>
                </div>

                <div className="pt-4 space-y-2">
                  <Button size="sm" className="w-full">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Create Quote
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    <Package className="mr-2 h-4 w-4" />
                    Reorder Stock
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}