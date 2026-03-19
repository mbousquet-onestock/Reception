import React, { useState } from 'react';
import { Menu, ChevronDown, ChevronUp, Check, Clock, X, AlertTriangle, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_TRANSFERS, StockTransfer, Article } from './constants';

interface DiscrepancyModalProps {
  item: Article;
  onClose: () => void;
  onSave: (reason: Article['discrepancyReason'], qty: number) => void;
}

const DiscrepancyModal: React.FC<DiscrepancyModalProps> = ({ item, onClose, onSave }) => {
  const [reason, setReason] = useState<Article['discrepancyReason']>(item.discrepancyReason || 'Manquant');
  const [qty, setQty] = useState<number>(item.discrepancyQuantity || 1);

  const reasons: Article['discrepancyReason'][] = ['Manquant', 'Défectueux', 'Référence incorrecte'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden"
      >
        <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
              <AlertTriangle size={24} />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">Signaler un problème</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-6 overflow-y-auto flex-grow">
          <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
            <img src={item.imageUrl} alt={item.name} className="w-12 h-16 object-cover rounded-md shadow-sm" />
            <div className="min-w-0">
              <p className="font-bold text-gray-800 truncate">{item.name}</p>
              <p className="text-sm text-gray-500 font-mono">{item.sku}</p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Motif du problème</label>
            <div className="grid grid-cols-1 gap-2">
              {reasons.map((r) => (
                <button
                  key={r}
                  onClick={() => setReason(r)}
                  className={`flex items-center justify-between p-3 sm:p-4 rounded-xl border-2 transition-all ${
                    reason === r 
                      ? 'border-[#2563EB] bg-blue-50 text-[#2563EB]' 
                      : 'border-gray-100 hover:border-gray-200 text-gray-600'
                  }`}
                >
                  <span className="font-semibold text-sm sm:text-base">{r}</span>
                  {reason === r && <Check size={20} />}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Quantité concernée</label>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-12 h-12 rounded-xl border-2 border-gray-100 flex items-center justify-center text-2xl font-bold text-gray-400 hover:border-gray-200 hover:text-gray-600 transition-all active:scale-90"
              >
                -
              </button>
              <div className="flex-grow h-12 rounded-xl border-2 border-gray-100 flex items-center justify-center text-xl font-bold text-gray-800">
                {qty}
              </div>
              <button 
                onClick={() => setQty(Math.min(item.quantity, qty + 1))}
                className="w-12 h-12 rounded-xl border-2 border-gray-100 flex items-center justify-center text-2xl font-bold text-gray-400 hover:border-gray-200 hover:text-gray-600 transition-all active:scale-90"
              >
                +
              </button>
            </div>
            <p className="text-xs text-gray-400 text-center">Maximum: {item.quantity} articles</p>
          </div>
        </div>

        <div className="p-4 sm:p-6 bg-gray-50 flex gap-3 flex-shrink-0">
          <button 
            onClick={onClose}
            className="flex-grow py-3 px-4 rounded-xl font-bold text-gray-500 hover:bg-gray-200 transition-colors text-sm sm:text-base"
          >
            Annuler
          </button>
          <button 
            onClick={() => onSave(reason, qty)}
            className="flex-grow py-3 px-4 rounded-xl font-bold bg-[#2563EB] text-white shadow-lg shadow-blue-200 active:scale-95 transition-all text-sm sm:text-base"
          >
            Confirmer
          </button>
        </div>
      </motion.div>
    </div>
  );
};

interface TransferItemProps {
  item: Article;
  status: 'Reçu' | 'À réceptionner';
  onUpdateDiscrepancy?: (reason: Article['discrepancyReason'] | undefined, qty: number | undefined) => void;
}

const TransferItem: React.FC<TransferItemProps> = ({ item, status, onUpdateDiscrepancy }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isDiscrepancy = !!item.discrepancyReason;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border-t border-gray-100 bg-white">
      <div className="flex items-start gap-4 flex-grow w-full">
        <div className="w-16 h-20 bg-gray-50 flex-shrink-0 overflow-hidden rounded-sm">
          <img 
            src={item.imageUrl} 
            alt={item.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex-grow min-w-0">
          <h4 className="text-[15px] font-medium text-gray-800 truncate leading-tight">
            {item.name}
          </h4>
          <p className="text-[14px] text-gray-500 mt-0.5">
            {item.price} | {item.size}
          </p>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <p className="text-[13px] text-gray-400 font-mono">
              {item.sku}
            </p>
            {isDiscrepancy && (
              <span className="text-[10px] sm:text-[11px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded uppercase tracking-tight whitespace-nowrap">
                {item.discrepancyReason} ({item.discrepancyQuantity})
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto gap-2 sm:flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-50">
        <div className="text-[12px] text-gray-400 font-medium">
          Attendu: <span className="text-gray-700 font-bold">{item.quantity}</span>
        </div>
        
        {status === 'À réceptionner' ? (
          <div className="flex items-center gap-2">
            {!isDiscrepancy ? (
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors shadow-sm active:scale-95"
              >
                <X size={16} className="text-[#2563EB] stroke-[3px]" />
                <span className="text-[#1E293B] font-bold text-[13px] sm:text-[14px]">Problème</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="text-[13px] font-bold text-[#2563EB] hover:underline"
                >
                  Modifier
                </button>
                <button 
                  onClick={() => onUpdateDiscrepancy?.(undefined, undefined)}
                  className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className={`bg-gray-100 text-gray-600 text-[12px] font-medium px-2 py-1 rounded-full min-w-[32px] text-center ${isDiscrepancy ? 'bg-red-100 text-red-600' : ''}`}>
            Reçu: {item.quantity - (item.discrepancyQuantity || 0)}
          </div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <DiscrepancyModal 
            item={item} 
            onClose={() => setIsModalOpen(false)}
            onSave={(reason, qty) => {
              onUpdateDiscrepancy?.(reason, qty);
              setIsModalOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

interface TransferCardProps {
  transfer: StockTransfer;
  onReceive: () => void;
  onUpdateDiscrepancy: (sku: string, reason: Article['discrepancyReason'] | undefined, qty: number | undefined) => void;
}

const TransferCard: React.FC<TransferCardProps> = ({ transfer, onReceive, onUpdateDiscrepancy }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-2 bg-white border border-gray-200 shadow-sm overflow-hidden">
      <div 
        className="p-3 sm:p-4 flex flex-col sm:flex-row sm:items-start justify-between cursor-pointer hover:bg-gray-50 transition-colors gap-3"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex-grow min-w-0">
          <div className="flex items-center justify-between sm:block">
            <h3 className="text-[15px] sm:text-[16px] font-semibold text-gray-800 truncate">
              Transfert {transfer.id}
            </h3>
            <div className="sm:hidden text-gray-400">
              {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
          </div>
          <p className="text-[13px] sm:text-[14px] text-gray-600 mt-0.5 truncate">
            De {transfer.from}
          </p>
          <p className="text-[12px] sm:text-[13px] text-gray-400 mt-0.5">
            {transfer.date}
          </p>
        </div>
        
        <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3" onClick={(e) => e.stopPropagation()}>
          {transfer.status === 'Reçu' ? (
            <div className="flex items-center gap-1 bg-[#1ABC9C] text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-[12px] sm:text-[14px] font-medium shadow-sm">
              <Check size={14} className="sm:w-4 sm:h-4" />
              <span>Reçu</span>
            </div>
          ) : (
            <button 
              onClick={onReceive}
              className="flex items-center gap-1 bg-[#EBF5FF] text-[#2563EB] px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-[12px] sm:text-[14px] font-medium shadow-sm border border-[#BFDBFE] hover:bg-[#DBEAFE] active:scale-95 transition-all"
            >
              <Clock size={14} className="sm:w-4 sm:h-4" />
              <span>À réceptionner</span>
            </button>
          )}
          <div className="hidden sm:block text-gray-400 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            {transfer.items.map((item, idx) => (
              <TransferItem 
                key={`${transfer.id}-${idx}`} 
                item={item} 
                status={transfer.status}
                onUpdateDiscrepancy={(reason, qty) => onUpdateDiscrepancy(item.sku, reason, qty)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [transfers, setTransfers] = useState<StockTransfer[]>(MOCK_TRANSFERS);

  const handleReceive = (transferId: string) => {
    setTransfers(prev => prev.map(t => 
      t.id === transferId ? { ...t, status: 'Reçu' } : t
    ));
  };

  const handleUpdateDiscrepancy = (transferId: string, sku: string, reason: Article['discrepancyReason'] | undefined, qty: number | undefined) => {
    setTransfers(prev => prev.map(t => {
      if (t.id !== transferId) return t;
      return {
        ...t,
        items: t.items.map(item => 
          item.sku === sku ? { 
            ...item, 
            discrepancyReason: reason, 
            discrepancyQuantity: qty,
            receivedQuantity: qty !== undefined ? item.quantity - qty : item.quantity
          } : item
        )
      };
    }));
  };

  const filteredTransfers = transfers.filter(transfer => 
    transfer.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#E2E2E2] font-sans">
      {/* Search Bar */}
      <div className="p-3 max-w-2xl mx-auto sticky top-0 z-10 bg-[#E2E2E2]/80 backdrop-blur-sm">
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher un numéro de transfert..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 pr-10 text-[15px] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="p-3 pt-0 max-w-2xl mx-auto">
        {filteredTransfers.length > 0 ? (
          filteredTransfers.map((transfer) => (
            <TransferCard 
              key={transfer.id} 
              transfer={transfer} 
              onReceive={() => handleReceive(transfer.id)}
              onUpdateDiscrepancy={(sku, reason, qty) => handleUpdateDiscrepancy(transfer.id, sku, reason, qty)}
            />
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            <p className="text-[16px]">Aucun transfert trouvé pour "{searchQuery}"</p>
          </div>
        )}
      </main>

      {/* Empty space at bottom for scrolling */}
      <div className="h-20" />
    </div>
  );
}
