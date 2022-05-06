type NodeType = 'root' | 'element' | 'text' | 'comment';

type Attrs = {
  [key: string]: any;
};

type ElementNode = {
  node: 'element';
  tag: string;
  attrs: Attrs;
  child: Array<ElementNode | TextNode | CommentNode>;
};

type TextNode = {
  node: 'text';
  text: string;
};

type CommentNode = {
  node: 'text';
  text: string;
};

type RootNode = {
  node: 'root';
  child: Array<ElementNode | TextNode | CommentNode>;
};

type Handler = {
  start: (tag: string, attrs: Attrs, unary: boolean) => void;
  end: (tag: string) => void;
  chars: (text: string) => void;
  comment: (text: string) => void;
};

export function htmlParser(html: string, handler: Handler): void;
export function html2json(html: string): RootNode;
export function json2html(json: RootNode): string;
