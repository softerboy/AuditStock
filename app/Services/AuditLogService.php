<?php

namespace App\Services;

use App\Models\AuditLog;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class AuditLogService
{
    /**
     * Get paginated audit logs with filters.
     */
    public function getPaginatedLogs(array $filters): LengthAwarePaginator
    {
        $query = AuditLog::with('user')->latest();

        if (! empty($filters['from'])) {
            $query->whereDate('created_at', '>=', $filters['from']);
        }

        if (! empty($filters['to'])) {
            $query->whereDate('created_at', '<=', $filters['to']);
        }

        return $query->paginate(20)->withQueryString();
    }
}
