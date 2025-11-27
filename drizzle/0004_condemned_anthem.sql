ALTER TABLE "pushup_habit" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "pushup_habit_log" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "pushup_user_stats" ADD CONSTRAINT "pushup_user_stats_user_id_unique" UNIQUE("user_id");