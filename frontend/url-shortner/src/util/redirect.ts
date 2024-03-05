// redirect
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

const NestedRouteComponent: React.FC = () => {
    const navigate = useNavigate();

    // Your logic, if needed

    // Redirect to http://localhost:3000
    navigate('http://localhost:3000', { replace: true });

    // This component will not be rendered, as the navigation happens before rendering
    return null;
};

export default NestedRouteComponent;
