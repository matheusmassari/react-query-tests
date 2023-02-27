import { useMutation, useQuery } from "react-query";

async function fetchComments(postId) {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    return response.json();
}

async function deletePost(postId) {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/postId/${postId}`,
        { method: "DELETE" }
    );
    return response.json();
}

async function updatePost(postId) {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/postId/${postId}`,
        { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
    );
    return response.json();
}

export function PostDetail({ post }) {
    // replace with useQuery

    const { data, isLoading, error } = useQuery(["comments", post.id], () =>
        fetchComments(post.id)
    );

    const deleteMutation = useMutation((postId) => deletePost(postId));
    const updateMutation = useMutation((postId) => updatePost(postId));

    return (
        <>
            <h3 style={{ color: "blue" }}>{post.title}</h3>
            <button onClick={() => deleteMutation.mutate(post.id)}>
                Delete
            </button>{" "}
            {deleteMutation.isError && (
                <p style={{ color: "red" }}> Error deleting the post.</p>
            )}
            {deleteMutation.isLoading && (
                <p style={{ color: "purple" }}> Loading ... </p>
            )}
            {deleteMutation.isSuccess && (
                <p style={{ color: "green" }}> Successful request ! </p>
            )}
            <button onClick={() => updateMutation.mutate(post.id)}>
                Update title
            </button>
            {updateMutation.isError && (
                <p style={{ color: "red" }}> Error to update!</p>
            )}
            {updateMutation.isLoading && (
                <p style={{ color: "purple" }}> Update loading...</p>
            )}
            {updateMutation.isSuccess && (
                <p style={{ color: "green" }}> Update complete!</p>
            )}
            <p>{post.body}</p>
            <h4>Comments</h4>
            {isLoading && (
                <div>
                    <h3>Loading...</h3>
                </div>
            )}
            {error && (
                <>
                    <h3>Something went wrong :(</h3>
                    <p>{error.toString()}</p>
                </>
            )}
            {data &&
                data.map((comment) => (
                    <li key={comment.id}>
                        {comment.email}: {comment.body}
                    </li>
                ))}
        </>
    );
}