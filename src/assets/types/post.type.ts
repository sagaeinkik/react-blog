//Allt som lagras om blogpost i databasen
export interface BlogPost {
    _id: string;
    title: string;
    content: string;
    posted: string;
}

//Vad vi skickar till databasen
export interface NewBlogPost {
    title: string;
    content: string;
}

//API-respons
export interface BlogPostResponse {
    message: string;
    //Om succémeddelande
    post?: BlogPost;
    //Om det blir egna error från API:et
    https_response?: {
        message: string;
        code: number;
    };
    //Om det blir error från validering eller liknande
    statusCode?: number;
    code?: string;
    error?: number;
}

//Context type
export interface BlogPostContextType {
    posts: BlogPost[];
    loading: boolean;
    error: string | null;
    success: string | null;
    fetchPosts: () => Promise<void>;
    addPost: (post: NewBlogPost) => Promise<void>;
    updatePost: (id: string, updatedPost: NewBlogPost) => Promise<void>;
    deletePost: (id: string) => Promise<void>;
    resetSuccess: () => void;
}
