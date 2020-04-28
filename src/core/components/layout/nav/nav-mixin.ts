import { defineComponent } from '@vue/composition-api';
import { NavItem } from '@/core/types/nav';

export interface NavProps {
    navItems: NavItem[];
    name: string;
}

const NavMixin = defineComponent<NavProps>({
    props: {
        navItems: {
            required: true,
            type: Array
        }
    }
});

export default NavMixin;
