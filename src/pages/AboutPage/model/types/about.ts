import React from 'react';

export interface AboutPageItem {
    icon: React.VFC<React.SVGProps<SVGSVGElement>>;
    title: string;
    paragraphs?: string[];
    image: string;
    isReverse?: boolean;
}
