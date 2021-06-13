import { Menu } from './menu.model';

export const verticalMenuItems = [ 
    new Menu (2, 'Liste des matchs', '/pages/membership', null, 'list-ul', null, false, 0), 
    new Menu (66, 'Creation-foot', '/pages/creation-foot', null, 'pencil-square-o', null, false, 0), 
    new Menu (67, 'Creation-tennis', '/pages/creation-tennis', null, 'pencil-square-o', null, false, 0),
    new Menu (26, 'Tables', null, null, 'table', null, true, 0),
    new Menu (27, 'Basic Tables', '/pages/tables/basic-tables', null, 'th', null, false, 26), 
    new Menu (28, 'Dynamic Tables', null, null, 'th-large', null, true, 26), 
    new Menu (29, 'Smart DataTable', '/pages/tables/dynamic-tables/smart', null, 'caret-right', null, false, 28),
    new Menu (30, 'NGX DataTable', '/pages/tables/dynamic-tables/ngx', null, 'caret-right', null, false, 28), 
    new Menu (40, 'Pages', null, null, 'file-text-o', null, true, 0),
    new Menu (43, 'Login', '/login', null, 'sign-in', null, false, 40),    
    new Menu (45, 'Blank', '/pages/blank', null, 'file-o', null, false, 40),
    new Menu (46, 'Error', '/pagenotfound', null, 'exclamation-circle', null, false, 40),
    new Menu (50, 'Calendar', '/pages/calendar', null, 'calendar', null, false, 0)
]

export const horizontalMenuItems = [ 
    new Menu (2, 'Membership', '/pages/membership', null, 'users', null, false, 0), 
    new Menu (31, 'Tools', null, null, 'wrench', null, true, 3),
    new Menu (32, 'Drag & Drop', '/pages/tools/drag-drop', null, 'hand-paper-o', null, false, 31), 
    new Menu (33, 'Resizable', '/pages/tools/resizable', null, 'expand', null, false, 31), 
    new Menu (34, 'Toaster', '/pages/tools/toaster', null, 'bell-o', null, false, 31), 
    new Menu (20, 'Form Elements', null, null, 'pencil-square-o', null, true, 0), 
    new Menu (21, 'Form Controls', '/pages/form-elements/controls', null, 'check-square-o', null, false, 20),
    new Menu (22, 'Form Layouts', '/pages/form-elements/layouts', null, 'th-large', null, false, 20),
    new Menu (23, 'Form Validations', '/pages/form-elements/validations', null, 'exclamation-triangle', null, false, 20),
    new Menu (24, 'Form Wizard', '/pages/form-elements/wizard', null, 'magic', null, false, 20),
    new Menu (25, 'Editor', '/pages/form-elements/editor', null, 'pencil', null, false, 20),
    new Menu (26, 'Tables', null, null, 'table', null, true, 20),
    new Menu (27, 'Basic Tables', '/pages/tables/basic-tables', null, 'th', null, false, 26), 
    new Menu (28, 'Dynamic Tables', null, null, 'th-large', null, true, 26), 
    new Menu (29, 'Smart DataTable', '/pages/tables/dynamic-tables/smart', null, 'caret-right', null, false, 28),
    new Menu (30, 'NGX DataTable', '/pages/tables/dynamic-tables/ngx', null, 'caret-right', null, false, 28), 
    new Menu (40, 'Pages', null, null, 'file-text-o', null, true, 0),
    new Menu (66, 'Creation-foot', '/pages/creation-foot', null, 'th-large', null, false, 0), 
    new Menu (43, 'Login', '/login', null, 'sign-in', null, false, 40),    
    new Menu (45, 'Blank', '/pages/blank', null, 'file-o', null, false, 40),
    new Menu (46, 'Error', '/pagenotfound', null, 'exclamation-circle', null, false, 40),
    new Menu (50, 'Calendar', '/pages/calendar', null, 'calendar', null, false, 40)
]