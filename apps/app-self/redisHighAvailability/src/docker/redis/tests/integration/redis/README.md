- Title: Force Delete StatefulSet Pods - Kubernetes
  - Url: https://kubernetes.io/docs/tasks/run-application/force-delete-stateful-set-pod/

```
$ microk8s.kubectl delete pods {podName} --grace-period=0 --force
$ microk8s.kubectl delete pods redismaster-sgfhj --grace-period=0 --force
```

```
$ root@redismaster-sgfhj:/app# redis-cli info
```

# Server

redis_version:5.0.3
redis_git_sha1:00000000
redis_git_dirty:0
redis_build_id:9f27eb593282148b
redis_mode:standalone
os:Linux 4.15.0-43-generic x86_64
arch_bits:64
multiplexing_api:epoll
atomicvar_api:atomic-builtin
gcc_version:6.3.0
process_id:22
run_id:7116b7910cc314a7fb72fae2c1712a5d8753ac02
tcp_port:6379
uptime_in_seconds:497
uptime_in_days:0
hz:10
configured_hz:10
lru_clock:3397918
executable:/app/redis-server
config_file:/usr/local/etc/redis/redis.conf

# Clients

connected_clients:1
client_recent_max_input_buffer:2
client_recent_max_output_buffer:0
blocked_clients:0

# Memory

used_memory:12336200
used_memory_human:11.76M
used_memory_rss:16261120
used_memory_rss_human:15.51M
used_memory_peak:12417080
used_memory_peak_human:11.84M
used_memory_peak_perc:99.35%
used_memory_overhead:6712104
used_memory_startup:512472
used_memory_dataset:5624096
used_memory_dataset_perc:47.57%
allocator_allocated:12451120
allocator_active:12759040
allocator_resident:15347712
total_system_memory:6137180160
total_system_memory_human:5.72G
used_memory_lua:37888
used_memory_lua_human:37.00K
used_memory_scripts:0
used_memory_scripts_human:0B
number_of_cached_scripts:0
maxmemory:0
maxmemory_human:0B
maxmemory_policy:noeviction
allocator_frag_ratio:1.02
allocator_frag_bytes:307920
allocator_rss_ratio:1.20
allocator_rss_bytes:2588672
rss_overhead_ratio:1.06
rss_overhead_bytes:913408
mem_fragmentation_ratio:1.32
mem_fragmentation_bytes:3987808
mem_not_counted_for_evict:1980
mem_replication_backlog:1048576
mem_clients_slaves:50766
mem_clients_normal:49694
mem_aof_buffer:1980
mem_allocator:jemalloc-5.1.0
active_defrag_running:0
lazyfree_pending_objects:0

# Persistence

loading:0
rdb_changes_since_last_save:0
rdb_bgsave_in_progress:0
rdb_last_save_time:1546901659
rdb_last_bgsave_status:ok
rdb_last_bgsave_time_sec:0
rdb_current_bgsave_time_sec:-1
rdb_last_cow_size:524288
aof_enabled:1
aof_rewrite_in_progress:0
aof_rewrite_scheduled:0
aof_last_rewrite_time_sec:-1
aof_current_rewrite_time_sec:-1
aof_last_bgrewrite_status:ok
aof_last_write_status:ok
aof_last_cow_size:0
aof_current_size:6584551
aof_base_size:6748
aof_pending_rewrite:0
aof_buffer_length:0
aof_rewrite_buffer_length:0
aof_pending_bio_fsync:0
aof_delayed_fsync:0

# Stats

total_connections_received:66
total_commands_processed:101547
instantaneous_ops_per_sec:1
total_net_input_bytes:6634044
total_net_output_bytes:20502887
instantaneous_input_kbps:0.07
instantaneous_output_kbps:0.02
rejected_connections:0
sync_full:3
sync_partial_ok:0
sync_partial_err:0
expired_keys:0
expired_stale_perc:0.00
expired_time_cap_reached_count:0
evicted_keys:0
keyspace_hits:1
keyspace_misses:0
pubsub_channels:0
pubsub_patterns:0
latest_fork_usec:462
migrate_cached_sockets:0
slave_expires_tracked_keys:0
active_defrag_hits:0
active_defrag_misses:0
active_defrag_key_hits:0
active_defrag_key_misses:0

# Replication

role:master
connected_slaves:3
slave0:ip=10.1.1.1,port=6379,state=online,offset=6578475,lag=1
slave1:ip=10.1.1.1,port=6379,state=online,offset=6578475,lag=1
slave2:ip=10.1.1.1,port=6379,state=online,offset=6578475,lag=1
master_replid:1b3f041368d241992749df4d1af037b65514573f
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:6578489
second_repl_offset:-1
repl_backlog_active:1
repl_backlog_size:1048576
repl_backlog_first_byte_offset:5529914
repl_backlog_histlen:1048576

# CPU

used_cpu_sys:6.383104
used_cpu_user:1.270887
used_cpu_sys_children:0.028402
used_cpu_user_children:0.125926

# Cluster

cluster_enabled:0

# Keyspace

db0:keys=100001,expires=0,avg_ttl=0
root@redismaster-sgfhj:/app#
