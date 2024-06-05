
import { USER_ROLE } from '@/constants/role';
import { DrawerItem, UserRole } from '@/types';

//icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddTaskIcon from '@mui/icons-material/AddTask';
import TryIcon from '@mui/icons-material/Try';
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import StackedLineChartOutlinedIcon from '@mui/icons-material/StackedLineChartOutlined';

export const drawerItems = (role: UserRole): DrawerItem[] => {
   const roleMenus: DrawerItem[] = [];

   const defaultMenus = [
      {
         title: 'Profile',
         path: `${role}/profile`,
         icon: PersonIcon,
      },
      {
         title: 'Change Password',
         path: `change-password`,
         icon: KeyIcon,
      },
   ];

   switch (role) {
      case USER_ROLE.SUPER_ADMIN:
         roleMenus.push(
            {
               title: 'Dashboard',
               path: `${role}`,
               icon: DashboardIcon,
            },
            {
               title: 'Manage Users',
               path: `${role}/manage-users`,
               icon: GroupIcon,
            }
         );
         break;

      case USER_ROLE.ADMIN:
         roleMenus.push(
            {
               title: 'Dashboard',
               path: `${role}`,
               icon: DashboardIcon,
            },
            {
               title: 'View Users',
               path: `${role}/users`,
               icon: GroupOutlinedIcon,
            },
            {
               title: 'Manage Users',
               path: `${role}/manage-users`,
               icon: ModeEditOutlinedIcon,
            },
            {
               title: 'Web Activity Monitoring',
               path: `${role}/website-activity`,
               icon: StackedLineChartOutlinedIcon,
            }
         );
         break;

      case USER_ROLE.USER:
         roleMenus.push(
            {
               title: 'Dashboard',
               path: `${role}`,
               icon: DashboardIcon,
            },
            {
               title: 'Submit Lost Items',
               path: `${role}/addLostItem`,
               icon: AddTaskIcon,
            },
            {
               title: 'Submit Found Items',
               path: `${role}/addFoundItem`,
               icon: AddTaskIcon,
            },
            {
               title: 'Create a claim',
               path: `${role}/createClaim`,
               icon: AddTaskIcon,
            },
            {
                title: 'My Claim Requests',
                path: `${role}/myClaims`,
                icon: GppGoodOutlinedIcon,
             },
             {
                title: 'My Lost Items',
                path: `${role}/myLostItems`,
                icon: BuildOutlinedIcon,
             },
             {
                title: 'My Found Items',
                path: `${role}/myFoundItems`,
                icon: ZoomInIcon,
             }
         );
         break;

      default:
         break;
   }

   return [...roleMenus, ...defaultMenus];
};