// author: Heli Desai

import React from 'react';
import { useParams } from 'react-router-dom';
import useBlogDetail from '../../hooks/useBlogDetail';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import '../../styles/Markdown.css';

interface BlogDetailsPageProps {
  blogDetail: any;
}

const BlogDetailsPage: React.FC<BlogDetailsPageProps> = (props) => {
  const {blogDetail} = props;
  if (!blogDetail) return <div className="text-center mt-10 text-gray-500">Article not found</div>;

  const processContent = blogDetail.content.replaceAll(/[\t ]*\n[\t ]*/g, '\n')
  console.log(processContent);

  return (
    <div>
      {/* Full-width header image */}
      <div className="w-full">
        <img src={blogDetail.thumbnail} alt="Blog image" className="w-full h-[40vh] object-cover"/>
      </div>

      {/* Blog content container */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{blogDetail.title}</h1>
        <div className="prose lg:prose-lg">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {processContent}
          </ReactMarkdown>
        </div>

        {/* Additional images in the content */}
        {blogDetail.images && blogDetail.images.map((image, index) => (
          <img key={index} src={image} alt={`Detail ${index}`} className="mt-4 rounded-lg shadow-md" />
        ))}
      </div>
    </div>
  );
};

export default BlogDetailsPage;
