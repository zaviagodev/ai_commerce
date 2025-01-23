import { motion } from "framer-motion";
import { Star, ThumbsUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface AppReviewsProps {
  rating: number;
  reviews: number;
}

const REVIEWS = [
  {
    id: "1",
    author: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    rating: 5,
    date: "2024-01-15",
    content:
      "This app has completely transformed how we manage our inventory. The real-time tracking and automated reordering features have saved us countless hours.",
    helpful: 24,
  },
  {
    id: "2",
    author: "Michael Chen",
    avatar: "https://i.pravatar.cc/150?u=michael",
    rating: 4,
    date: "2024-01-10",
    content:
      "Great app overall, but could use some improvements in the reporting features. Customer support has been very responsive to feedback.",
    helpful: 12,
  },
  {
    id: "3",
    author: "Emily Davis",
    avatar: "https://i.pravatar.cc/150?u=emily",
    rating: 5,
    date: "2024-01-05",
    content:
      "The multi-warehouse management feature is a game-changer for our business. Very intuitive interface and powerful features.",
    helpful: 18,
  },
];

export function AppReviews({ rating, reviews }: AppReviewsProps) {
  return (
    <div className="space-y-8">
      {/* Rating Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-8 rounded-lg border p-6"
      >
        <div className="text-center">
          <div className="text-4xl font-bold">{rating}</div>
          <div className="flex items-center justify-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            {reviews} reviews
          </div>
        </div>

        <div className="flex-1 space-y-2">
          {[5, 4, 3, 2, 1].map((stars) => {
            const percentage = Math.round(
              (REVIEWS.filter((r) => r.rating === stars).length /
                REVIEWS.length) *
                100,
            );
            return (
              <div key={stars} className="flex items-center gap-2">
                <div className="flex items-center gap-1 w-12">
                  <span className="text-sm">{stars}</span>
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="h-2 flex-1 rounded-full bg-muted">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: stars * 0.1 }}
                    className="h-full rounded-full bg-yellow-400"
                  />
                </div>
                <div className="w-12 text-sm text-muted-foreground">
                  {percentage}%
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Reviews List */}
      <div className="space-y-6">
        {REVIEWS.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="space-y-4 rounded-lg border p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={review.avatar} />
                  <AvatarFallback>{review.author[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{review.author}</div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <ThumbsUp className="mr-2 h-4 w-4" />
                Helpful ({review.helpful})
              </Button>
            </div>
            <p className="text-muted-foreground">{review.content}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
