import { useState } from 'react';
import { Star, Trash2, Reply, ThumbsUp, MoreVertical } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface CommentsPageProps {
  isAdmin: boolean;
}

interface Review {
  id: number;
  userName: string;
  userInitials: string;
  rating: number;
  date: string;
  carName: string;
  comment: string;
  likes: number;
  adminReply?: string;
}

const mockReviews: Review[] = [
  {
    id: 1,
    userName: 'Sarah Johnson',
    userInitials: 'SJ',
    rating: 5,
    date: '2025-10-25',
    carName: 'Tesla Model S',
    comment:
      'Absolutely amazing experience! The car was in perfect condition, very clean, and drove like a dream. The pickup process was seamless and the staff was incredibly helpful.',
    likes: 24,
    adminReply: 'Thank you so much for the wonderful feedback, Sarah! We are thrilled you enjoyed your experience with us.',
  },
  {
    id: 2,
    userName: 'Michael Chen',
    userInitials: 'MC',
    rating: 4,
    date: '2025-10-22',
    carName: 'Range Rover Sport',
    comment:
      'Great SUV for our family trip. Spacious and comfortable. Only minor issue was a small scratch that was already there but not documented. Otherwise, perfect!',
    likes: 12,
  },
  {
    id: 3,
    userName: 'Emma Williams',
    userInitials: 'EW',
    rating: 5,
    date: '2025-10-20',
    carName: 'Porsche 911',
    comment:
      'Living the dream! This car is absolutely stunning and a joy to drive. Worth every penny. Will definitely rent again for special occasions.',
    likes: 31,
    adminReply: 'We are so happy you loved the Porsche! Looking forward to serving you again.',
  },
  {
    id: 4,
    userName: 'David Brown',
    userInitials: 'DB',
    rating: 3,
    date: '2025-10-18',
    carName: 'BMW X5',
    comment:
      'Good car overall, but had some issues with the Bluetooth connectivity. Also, the pickup took longer than expected. Car itself was fine.',
    likes: 5,
  },
  {
    id: 5,
    userName: 'Lisa Anderson',
    userInitials: 'LA',
    rating: 5,
    date: '2025-10-15',
    carName: 'Mercedes S-Class',
    comment:
      'Luxury at its finest! The Mercedes was immaculate and drove beautifully. Customer service was top-notch. Highly recommended for business trips.',
    likes: 18,
    adminReply: 'Thank you, Lisa! We pride ourselves on providing the best service possible.',
  },
];

export function CommentsPage({ isAdmin }: CommentsPageProps) {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleDelete = (reviewId: number) => {
    setReviews(reviews.filter((review) => review.id !== reviewId));
  };

  const handleReply = (reviewId: number) => {
    if (replyText.trim()) {
      setReviews(
        reviews.map((review) =>
          review.id === reviewId ? { ...review, adminReply: replyText } : review
        )
      );
      setReplyText('');
      setReplyingTo(null);
    }
  };

  const handleLike = (reviewId: number) => {
    setReviews(
      reviews.map((review) =>
        review.id === reviewId ? { ...review, likes: review.likes + 1 } : review
      )
    );
  };

  const averageRating = (
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  ).toFixed(1);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1>Customer Reviews</h1>
        <p className="text-muted-foreground mt-1">
          {isAdmin ? 'Manage customer feedback and reviews' : 'See what our customers are saying'}
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-4xl font-semibold text-primary mb-2">{averageRating}</div>
            <div className="flex justify-center mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(parseFloat(averageRating))
                      ? 'text-yellow-500 fill-yellow-500'
                      : 'text-muted-foreground'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">Average Rating</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-4xl font-semibold text-primary mb-2">{reviews.length}</div>
            <p className="text-sm text-muted-foreground mt-4">Total Reviews</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-4xl font-semibold text-primary mb-2">
              {reviews.filter((r) => r.rating === 5).length}
            </div>
            <p className="text-sm text-muted-foreground mt-4">5-Star Reviews</p>
          </CardContent>
        </Card>
      </div>

      {/* Reviews List */}
      <Card>
        <CardHeader>
          <CardTitle>All Reviews</CardTitle>
          <CardDescription>Recent customer feedback and ratings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="space-y-4">
              <div className="flex gap-4">
                <Avatar className="w-12 h-12 flex-shrink-0">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {review.userInitials}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm">{review.userName}</h4>
                        <Badge variant="outline" className="text-xs">
                          {review.carName}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'text-yellow-500 fill-yellow-500'
                                  : 'text-muted-foreground'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(review.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>

                    {isAdmin && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => setReplyingTo(review.id)}
                            className="gap-2"
                          >
                            <Reply className="w-4 h-4" />
                            Reply
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(review.id)}
                            className="gap-2 text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground">{review.comment}</p>

                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2 h-8"
                      onClick={() => handleLike(review.id)}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-xs">{review.likes}</span>
                    </Button>
                    {!isAdmin && (
                      <Button variant="ghost" size="sm" className="gap-2 h-8">
                        <Reply className="w-4 h-4" />
                        <span className="text-xs">Reply</span>
                      </Button>
                    )}
                  </div>

                  {/* Admin Reply */}
                  {review.adminReply && (
                    <div className="ml-4 pl-4 border-l-2 border-primary/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-primary text-xs">Admin Response</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.adminReply}</p>
                    </div>
                  )}

                  {/* Reply Form */}
                  {isAdmin && replyingTo === review.id && (
                    <div className="ml-4 space-y-2">
                      <Textarea
                        placeholder="Write your reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="min-h-[80px]"
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleReply(review.id)}>
                          Send Reply
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setReplyingTo(null);
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

              {review.id !== reviews[reviews.length - 1].id && (
                <div className="h-px bg-border" />
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
