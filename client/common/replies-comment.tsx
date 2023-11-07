const RepliesComment = () => {
  return (
    <>
      {commentReplies.length > 0 && (
        <div className=" flex flex-col gap-4 bg-accent p-2 rounded">
          {commentReplies.map((reply) => (
            <div key={reply._id}>
              <User
                className=" pl-1"
                classNames={{ name: " text-[13px]" }}
                name={reply.commentedUser.name}
                avatarProps={{
                  src: reply.commentedUser.image,
                  style: { width: "30px", height: "30px" },
                }}
                description={`@${reply.commentedUser.userName}`}
              />
              <p className=" pl-11 text-[14px]">{reply.content}</p>
              <RepliesAction comment={reply} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default RepliesComment;
