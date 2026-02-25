import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import ParchmentPanel from "@/components/ParchmentPanel";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { fetchCommunityFeed } from "@/lib/api";
import type { CommunityPost } from "@/lib/types";

const CommunityPage = () => {
  const { token } = useAuth();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const [totalCount, setTotalCount] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    fetchCommunityFeed(1, pageSize)
      .then((feed) => {
        setTotalCount(feed.totalCount);
        setPage(1);
        setPosts(
          [...feed.posts].sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        );
      })
      .finally(() => setLoading(false));
  }, [token]);

  const normalizedQuery = query.trim().toLowerCase();
  const visiblePosts = normalizedQuery
    ? posts.filter((p) => {
        const hay = `${p.title} ${p.body}`.toLowerCase();
        return hay.includes(normalizedQuery);
      })
    : posts;

  useEffect(() => {
    if (!token) return;
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      const canLoadMore = posts.length < totalCount;
      if (entry.isIntersecting && !loading && !loadingMore && canLoadMore) {
        const next = page + 1;
        setLoadingMore(true);
        fetchCommunityFeed(next, pageSize)
          .then((feed) => {
            setPage(next);
            setTotalCount(feed.totalCount);
            setPosts((prev) => {
              const merged = [...prev, ...feed.posts];
              const unique = Array.from(new Map(merged.map((p) => [p.id, p])).values());
              return unique.sort(
                (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
              );
            });
          })
          .finally(() => setLoadingMore(false));
      }
    }, { threshold: 0.1 });
    const el = sentinelRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, [token, loading, loadingMore, posts.length, totalCount, page, pageSize]);

  return (
    <motion.div
      className="min-h-screen flex flex-col gap-5 p-5 overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="font-jua text-4xl text-foreground text-shadow-deep">📜 동물들의 광장</h1>
      <div className="flex gap-3">
        <Input
          placeholder="제목 또는 내용 검색"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <ParchmentPanel key={i} className="p-5">
              <Skeleton className="h-6 w-1/3 rounded bg-parchment-border mb-3" />
              <Skeleton className="h-4 w-2/3 rounded bg-parchment-border mb-2" />
              <Skeleton className="h-4 w-1/2 rounded bg-parchment-border" />
            </ParchmentPanel>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4 overflow-y-auto overflow-x-hidden flex-1 items-center">
          {visiblePosts.map((post) => (
            <motion.div key={post.id} whileHover={{ y: -2 }}>
              <div className="mx-auto w-[680px]">
                <ParchmentPanel className="px-5 py-5 cursor-pointer h-[220px] overflow-hidden">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{post.authorEmoji}</span>
                  <div>
                    <span className="font-jua text-lg" style={{ color: "hsl(var(--wood-darkest))" }}>
                      {post.authorNickname}
                    </span>
                    <span className="text-xs ml-2 opacity-50">
                      {new Date(post.createdAt).toLocaleDateString("ko-KR")}
                    </span>
                  </div>
                </div>
                  <h3 className="font-jua text-xl mb-1 truncate" style={{ color: "hsl(var(--wood-darkest))" }}>
                  {post.title}
                </h3>
                  <p
                    className="text-sm overflow-hidden"
                    style={{
                      color: "hsl(var(--wood-dark))",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {post.body}
                  </p>
                <div className="flex gap-4 mt-3 text-sm" style={{ color: "hsl(var(--wood-light))" }}>
                  <span>❤️ {post.likes}</span>
                  <span>💬 {post.comments}</span>
                  {post.tags.map((t) => (
                    <span key={t} className="rounded-full bg-parchment-border px-2 py-0.5 text-xs">
                      #{t}
                    </span>
                  ))}
                </div>
                </ParchmentPanel>
              </div>
            </motion.div>
          ))}
          <div ref={sentinelRef} />
          {loadingMore && (
            <div className="text-center py-3 text-sm opacity-70" style={{ color: "hsl(var(--wood-light))" }}>
              더 불러오는 중...
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default CommunityPage;
