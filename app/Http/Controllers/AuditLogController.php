<?php

namespace App\Http\Controllers;

use App\Models\AuditLog;
use App\Services\AuditLogService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AuditLogController extends Controller
{
    use AuthorizesRequests;

    public function __construct(protected AuditLogService $auditLogService) {}

    /**
     * Display a listing of the audit logs.
     */
    public function index(Request $request): Response
    {
        $this->authorize('viewAny', AuditLog::class);

        return Inertia::render('audit/index', [
            'logs' => $this->auditLogService->getPaginatedLogs($request->all()),
            'filters' => $request->only(['from', 'to']),
        ]);
    }
}
