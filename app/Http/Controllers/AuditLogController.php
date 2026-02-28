<?php

namespace App\Http\Controllers;

use App\Models\AuditLog;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AuditLogController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the audit logs.
     */
    public function index(Request $request): Response
    {
        $this->authorize('viewAny', AuditLog::class);

        $query = AuditLog::with('user')->latest();

        if ($request->filled('from')) {
            $query->whereDate('created_at', '>=', $request->from);
        }

        if ($request->filled('to')) {
            $query->whereDate('created_at', '<=', $request->to);
        }

        return Inertia::render('audit/index', [
            'logs' => $query->paginate(20)->withQueryString(),
            'filters' => $request->only(['from', 'to']),
        ]);
    }
}
