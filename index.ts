

import { Grid, Edit, Toolbar } from '@syncfusion/ej2-grids';
import { productData } from './productData.ts';

Grid.Inject(Edit, Toolbar);

let grid: Grid = new Grid({
  dataSource: productData,
  editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true},
  toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
  columns: [
    { field: 'ProductID', headerText: 'Product ID', textAlign: 'Right', isPrimaryKey: true, validationRules: { required: true},width: 100},
    { field: 'ProductName', headerText: 'Product Name', validationRules: { required: true }, width: 120},
    { field: 'UnitPrice', headerText: 'UnitPrice', editType: 'numericedit', edit: { params: { change: () => calculateTotalCost() }}, validationRules: { required: true, min: 1 }, format: 'C2', textAlign: 'Right'},
    { field: 'UnitsInStock', headerText: 'Units In Stock', editType: 'numericedit',  edit: { params: { change: () => calculateTotalCost() }}, width: 150, textAlign: 'Right'},
    { field: 'TotalCost', headerText: 'Total Unit Cost', textAlign: 'Right',  allowEditing: false, width: 140, format: 'C2'}
  ]
});
grid.appendTo('#Grid');

function calculateTotalCost() {
  let formElement = (grid.element.querySelector('form')as HTMLFormElement)['ej2_instances'][0];
  formElement.getInputElement('TotalCost').value = formElement.getInputElement('UnitPrice').value * formElement.getInputElement('UnitsInStock').value;
}