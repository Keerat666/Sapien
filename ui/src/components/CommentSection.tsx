import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, MessageCircle, Reply, MoreHorizontal } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { mockComments } from '@/lib/mockData';
import type { Comment } from '@/lib/mockData';

interface CommentSectionProps {
  promptId: string;
}

const MAX_COMMENT_LENGTH = 1000;

const CommentItem = ({ 
  comment, 
  isReply = false, 
  parentId, 
  replyTo, 
  setReplyTo, 
  replyText, 
  setReplyText, 
  handleSubmitReply, 
  handleLikeComment 
}: { 
  comment: Comment; 
  isReply?: boolean; 
  parentId?: string;
  replyTo: string | null;
  setReplyTo: (id: string | null) => void;
  replyText: string;
  setReplyText: (text: string) => void;
  handleSubmitReply: (commentId: string) => Promise<void>;
  handleLikeComment: (commentId: string, isReply?: boolean, parentId?: string) => void;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (replyTo === comment.id && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [replyTo, comment.id]);

  return (
    <Card className={`glass-card ${isReply ? 'ml-12' : ''}`}>
      <CardContent className="p-4">
        <div className="flex gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
            <AvatarFallback className="bg-gradient-primary text-primary-foreground text-sm">
              {comment.author.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0 overflow-hidden">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium text-foreground">
                {comment.author.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
            
            <p className="text-foreground mb-3 leading-relaxed break-all overflow-wrap-anywhere whitespace-pre-wrap max-w-full">
              {comment.content}
            </p>
            
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLikeComment(comment.id, isReply, parentId)}
                className="text-muted-foreground hover:text-red-400 transition-colors"
              >
                <Heart className="w-4 h-4 mr-1" />
                {comment.likes}
              </Button>
              
              {!isReply && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Reply className="w-4 h-4 mr-1" />
                  Reply
                </Button>
              )}
              
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Reply Form */}
            {replyTo === comment.id && (
              <div className="mt-4 p-4 bg-muted/20 rounded-lg">
                <Textarea
                  ref={textareaRef}
                  placeholder="Write a reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="mb-3 bg-background/50"
                  maxLength={MAX_COMMENT_LENGTH}
                />
                <div className="flex justify-between items-center mb-3">
                  <span className={`text-sm ${
                    replyText.length > MAX_COMMENT_LENGTH * 0.9 
                      ? replyText.length >= MAX_COMMENT_LENGTH 
                        ? 'text-red-500' 
                        : 'text-yellow-500'
                      : 'text-muted-foreground'
                  }`}>
                    {replyText.length}/{MAX_COMMENT_LENGTH}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleSubmitReply(comment.id)}
                    disabled={!replyText.trim() || replyText.length > MAX_COMMENT_LENGTH}
                  >
                    Reply
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setReplyTo(null);
                      setReplyText('');
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const CommentSection = ({ promptId }: CommentSectionProps) => {
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [comments, setComments] = useState(mockComments[promptId] || []);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmitComment = async () => {
    if (!newComment.trim() || !user) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: user,
      content: newComment.trim(),
      createdAt: new Date().toISOString(),
      likes: 0,
      replies: []
    };

    setComments([comment, ...comments]);
    setNewComment('');
    
    toast({
      title: "Comment posted",
      description: "Your comment has been added successfully.",
    });
  };

  const handleSubmitReply = async (commentId: string) => {
    if (!replyText.trim() || !user) return;

    const reply: Comment = {
      id: Date.now().toString(),
      author: user,
      content: replyText.trim(),
      createdAt: new Date().toISOString(),
      likes: 0
    };

    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, replies: [...(comment.replies || []), reply] }
        : comment
    ));
    
    setReplyText('');
    setReplyTo(null);
    
    toast({
      title: "Reply posted",
      description: "Your reply has been added successfully.",
    });
  };

  const handleLikeComment = (commentId: string, isReply = false, parentId?: string) => {
    if (isReply && parentId) {
      setComments(comments.map(comment => 
        comment.id === parentId
          ? {
              ...comment,
              replies: comment.replies?.map(reply =>
                reply.id === commentId
                  ? { ...reply, likes: reply.likes + 1 }
                  : reply
              )
            }
          : comment
      ));
    } else {
      setComments(comments.map(comment =>
        comment.id === commentId
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      ));
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
        <MessageCircle className="w-5 h-5" />
        Comments ({comments.length})
      </h3>

      {/* New Comment Form */}
      {user ? (
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-gradient-primary text-primary-foreground text-sm">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="Share your thoughts about this prompt..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="mb-3 bg-background/50"
                  maxLength={MAX_COMMENT_LENGTH}
                />
                <div className="flex justify-between items-center mb-3">
                  <span className={`text-sm ${
                    newComment.length > MAX_COMMENT_LENGTH * 0.9 
                      ? newComment.length >= MAX_COMMENT_LENGTH 
                        ? 'text-red-500' 
                        : 'text-yellow-500'
                      : 'text-muted-foreground'
                  }`}>
                    {newComment.length}/{MAX_COMMENT_LENGTH}
                  </span>
                </div>
                <Button
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim() || newComment.length > MAX_COMMENT_LENGTH}
                  className="bg-primary hover:bg-primary/90"
                >
                  Post Comment
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <p className="text-muted-foreground">
              Please log in to leave a comment.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-3">
            <CommentItem 
              comment={comment}
              replyTo={replyTo}
              setReplyTo={setReplyTo}
              replyText={replyText}
              setReplyText={setReplyText}
              handleSubmitReply={handleSubmitReply}
              handleLikeComment={handleLikeComment}
            />
            
            {/* Replies */}
            {comment.replies?.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                isReply={true}
                parentId={comment.id}
                replyTo={replyTo}
                setReplyTo={setReplyTo}
                replyText={replyText}
                setReplyText={setReplyText}
                handleSubmitReply={handleSubmitReply}
                handleLikeComment={handleLikeComment}
              />
            ))}
          </div>
        ))}
        
        {comments.length === 0 && (
          <Card className="glass-card">
            <CardContent className="p-8 text-center">
              <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No comments yet. Be the first to share your thoughts!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CommentSection;