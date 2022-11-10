import React from 'react';
import useTitle from '../customHooks/useTitle';

const BlogPage = () => {
    useTitle('Blogs');
    return (
        <div className='' style={{ minHeight: '90vh' }}>
            this is blog page
        </div>
    );
};

export default BlogPage;